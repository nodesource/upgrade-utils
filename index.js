var fs = require('fs')
var path = require('path')
var diff = require('diff')
var marked = require('marked')
var chalk = require('chalk')
var handlebars = require('handlebars')
var opener = require('opener')

var replacements = require('./lib/replacements.js')()
var suggestions = require('./lib/suggestions.js')()
var processed = 0
var changed = []
var suggested = {}
var dir, update, filters, quiet, callback

// Recursive function searching files and directories in a path to process files
function searchFiles (file) {
  fs.lstat(file, function (err, stats) {
    if (err) throw err

    var isFile = stats.isFile()

    if (stats.isSymbolicLink()) {
      return
    }

    // Looking just for filtered extensions
    if (isFile && filters.indexOf(path.extname(file)) !== -1) {
      console.log('Processing ' + file)

      // Adding the file to the queue
      processed++
      processFile(file)
    } else if (stats.isDirectory() && file.indexOf('node_modules') === -1) {
      // Reading directories
      fs.readdir(file, function (err, files) {
        if (err) throw err
        for (var i = 0; i < files.length; i++) {
          // Avoid hidden files and directories
          if (/^[^.].*$/.test(files[i])) {
            searchFiles(path.join(file, files[i]))
          }
        }
      })
    }
  })
}

// Function replacing all regex in a file and returning the new content
function processFile (file) {
  fs.readFile(file, 'utf-8', function (err, text) {
    if (err) {
      if (err.code === 'EMFILE') {
        console.error('Too many files, increase your OS limit')
        process.exit(1)
      }
      throw err
    }

    // Replacing text
    var content = replaceText(text, file)

    // Checking for changes
    if (content !== null) {
      var changes = diff.diffLines(text, content)
      changed.push({
        file: file,
        changes: changes
      })

      // Writing the file if update is true
      if (update) {
        fs.writeFile(file, content, function (err) {
          if (err) throw err
          console.log('The file ' + file + ' was updated')
        })
      }
    }

    // reducing the queue
    processed--

    // Printing results after process all files
    if (processed === 0) {
      printResults()
    }
  })
}

function replaceText (text, file) {
  // replacing all regexps
  var content = text

  // Checking for Nan replacements
  if (path.extname(file) !== '.js') {
    for (var i = 0; i < replacements.length; i++) {
      var exp = new RegExp(replacements[i].search, 'g')
      content = content.replace(exp, replacements[i].replace)
    }
  }

  // Checking for JS suggestions
  if (path.extname(file) === '.js') {
    for (var k = 0; k < suggestions.length; k++) {
      var regex = suggestions[k].exp || '([A-z0-9_]*)\s*=\s*require(?:\s*)\((\s*)(?:\'|"|)' + suggestions[k].subsystem + '(?:\'|"|\s*)(\s*)\)'
      var sug = new RegExp(regex, 'g')
      if (sug.test(text)) {
        var subsystem = suggestions[k].subsystem
        if (suggested[subsystem]) {
          suggested[subsystem].files.push(file)
        } else {
          suggested[subsystem] = {
            doc: subsystem,
            files: [file]
          }
        }
      }
    }
  }

  // Returning null if not changes
  if (content === text) {
    return null
  }

  return content
}

function printResults () {
  if (changed.length === 0 && Object.keys(suggested).length === 0) {
    console.log(chalk.green('Nothing to suggest or replace in the current path after looking for file extensions: ' + filters.join(', ')))
    if (callback) return callback()
    return
  }

  if (update) {
    var lastMessage = 'All your native files were changed, for the next step update your NAN dependency to the last version and and try building your module.'
    console.log(chalk.yellow(lastMessage))
  }

  for (var sug in suggested) {
    if (suggested.hasOwnProperty(sug)) {
      var doc = path.resolve(__dirname, 'lib', 'docs', suggested[sug].doc + '.md')
      suggested[sug].content = marked(fs.readFileSync(doc, 'utf-8'))
    }
  }

  var source = fs.readFileSync(path.resolve(__dirname, 'lib', 'template.hbs'), 'utf-8')
  var template = handlebars.compile(source)

  handlebars.registerHelper('asset', function (filepath) {
    return path.join(__dirname, 'lib', 'assets', filepath).replace(/\\/g, '/')
  })

  var html = template({diffs: changed, suggestions: suggested, update: update})

  fs.writeFile(path.join(dir, 'upgrade-log.html'), html, function (err) {
    if (err) throw err
    console.log(chalk.green('\n The file upgrade-log.html was created and contains all changes'))
    if (!quiet) {
      opener(path.join(dir, 'upgrade-log.html'))
    }
  })

  changed = []
  suggested = []

  if (callback) return callback()
}

module.exports = function (path, write, extensions, qlog, cb) {
  dir = path
  update = write
  quiet = qlog
  filters = extensions.split(',')
  callback = cb
  searchFiles(path)
}

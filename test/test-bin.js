/*
  global describe
  global it
*/

var assert = require('assert')
var exec = require('child_process').exec
var path = require('path')

describe('upgrade-utils bin', function () {
  var cmd = 'node ' + path.join(__dirname, '../bin/upgrade-utils') + ' '

  it('--help should run without errors', function (done) {
    exec(cmd + '--help', function (error, stdout, stderr) {
      assert(!error)
      done()
    })
  })

  it('--path should run without errors', function (done) {
    exec(cmd + '--path /tmp', function (error, stdout, stderr) {
      assert(!error)
      done()
    })
  })

  it('--extensions should run without errors', function (done) {
    exec(cmd + '--extensions .c,.cpp --path /tmp', function (error, stdout, stderr) {
      assert(!error)
      done()
    })
  })

  it('--quiet should run without errors', function (done) {
    exec(cmd + '--quiet --path /tmp', function (error, stdout, stderr) {
      assert(!error)
      done()
    })
  })

  it('--update should run without errors', function (done) {
    exec(cmd + '--update --path /tmp', function (error, stdout, stderr) {
      assert(!error)
      done()
    })
  })

  it('should return error on unknown command', function (done) {
    this.timeout(4000)

    exec(cmd + '-j', function (error, stdout, stderr) {
      assert(error)
      assert.equal(error.code, 1)
      done()
    })
  })
})

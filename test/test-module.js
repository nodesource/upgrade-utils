/*
  global describe
  global it
  global before
  global after
*/

var os = require('os')
var path = require('path')
var AdmZip = require('adm-zip')
var rimraf = require('rimraf')
var upgradeUtils = require('../index.js')
var expect = require('chai').expect

var tmp = path.join(os.tmpdir(), 'testmod')
var tmp2 = path.join(os.tmpdir(), 'testchanged')

function extractModule () {
  var zipFile = path.join(__dirname, 'resources', 'test-mod.zip')
  var zipFile2 = path.join(__dirname, 'resources', 'test-changed.zip')
  var zip = new AdmZip(zipFile)
  var zip2 = new AdmZip(zipFile2)
  zip.extractAllTo(tmp)
  zip2.extractAllTo(tmp2)
}

describe('Module testing', function () {
  before(function () {
    extractModule()
  })

  after(function () {
    rimraf.sync(tmp)
    rimraf.sync(tmp2)
  })

  it('should export a function', function (done) {
    expect(upgradeUtils).to.be.a('function')
    done()
  })

  it('should check a module', function (done) {
    upgradeUtils(tmp, false, '.c,.cc,.cpp,.h,.hh,.hh,.js', true, done)
  })

  it('should launch a log', function (done) {
    upgradeUtils(tmp, false, '.c,.cc,.cpp,.h,.hh,.js', false, done)
  })

  it('should update the module', function (done) {
    upgradeUtils(tmp, true, '.c,.cc,.cpp,.h,.hh,.js', true, done)
  })

  it('should not duplicate changes in the module', function (done) {
    upgradeUtils(tmp2, true, '.c,.cc,.cpp,.h,.hh', true, done)
  })
})

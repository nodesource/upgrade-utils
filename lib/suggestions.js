var suggestions = [
 {subsystem: 'assert'},
 {subsystem: 'buffer', exp: 'Buffer'},
 {subsystem: 'child_process'},
 {subsystem: 'cluster'},
 {subsystem: 'crypto'},
 {subsystem: 'dgram'},
 {subsystem: 'domain'},
 {subsystem: 'events'},
 {subsystem: 'freelist'},
 {subsystem: 'fs'},
 {subsystem: 'http'},
 {subsystem: 'net'},
 {subsystem: 'os'},
 {subsystem: 'path'},
 {subsystem: 'process', exp: 'process\.'},
 {subsystem: 'querystring', exp: 'querystring\.'},
 {subsystem: 'smalloc', exp: 'smalloc\.'},
 {subsystem: 'stream'},
 {subsystem: 'string_decoder'},
 {subsystem: 'timers', exp: 'setImmediate'},
 {subsystem: 'tls'},
 {subsystem: 'url'},
 {subsystem: 'util', exp: 'util.'},
 {subsystem: 'vm'}
]

module.exports = function () {
  return suggestions
}

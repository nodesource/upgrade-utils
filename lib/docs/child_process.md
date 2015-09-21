[[Docs](https://iojs.org/api/child_process.html)]

- [`ChildProcess.prototype.send()`](https://iojs.org/api/child_process.html#child_process_child_send_message_sendhandle) is now always asynchronous, where previously it was blocking on Unix.
  - Pull request [#2620](https://github.com/nodejs/node/pull/2620), which should land before 4.0.0, will make `send()` accept a callback as the last argument, with will be called with one argument: `null` if it succeeded, or an `Error` if it failed.
  - Refs: [#760](https://github.com/nodejs/node/issues/760), [#2620](https://github.com/nodejs/node/pull/2620)
- The `customFds` option for [`ChildProcess.prototype.spawn()`](https://iojs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) is deprecated. Instead of `customFds` you can use the [`stdio`](https://iojs.org/api/child_process.html#child_process_options_stdio) option like [this example](https://github.com/mochajs/mocha/pull/1364/files).
  - Refs: [`2454695`](https://github.com/nodejs/node/commit/245469587c7a6326d1b55bdf6c6d6650d72bfa22)
- The [`'disconnect'`](https://iojs.org/api/child_process.html#child_process_event_disconnect) event on a `ChildProcess` is now fired asynchronously.
  - Refs: [`b255f4c`](https://github.com/nodejs/node/commit/b255f4c10a80343f9ce1cee56d0288361429e214)

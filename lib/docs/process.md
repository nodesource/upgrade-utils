[[Docs](https://iojs.org/api/process.html)]

- Added the concept of `beforeExit` time.
  - Before the process emits [`'exit'`](https://iojs.org/api/process.html#process_event_exit) and begins shutting down, it will emit a [`'beforeExit'`](https://iojs.org/api/process.html#process_event_beforeexit) event. Code that is run in the `'beforeExit'` event can schedule async operations that will hold the event loop open, unlike `'exit'` where it is too late to async operations.
  - Refs: [`a2eeb43`](https://github.com/nodejs/node/commit/a2eeb43deda58e7bbb8fcf24b934157992b937c0)
- Chunked writes to sdtout/stderr will now be lost if the process is terminated early.
  - Chunked writes happen when the string to be written is beyond a certain, fairly large, size.
  - Refs: [#784](https://github.com/nodejs/node/issues/784), [#1771](https://github.com/nodejs/node/pull/1771)
- [`process.kill()`](https://iojs.org/api/process.html#process_process_kill_pid_signal) now throws errors on non-numeric input.
  - Strings that can be coerced to numbers still work. e.g. `process.kill('0')`.
  - Refs: [`832ec1c`](https://github.com/nodejs/node/commit/832ec1cd507ed344badd2ed97d3da92975650a95), [`743a009`](https://github.com/nodejs/node/commit/743a009bad64c4302a724f70c42d73601a16aed4)
- `process.maxTickDepth` has been removed, allowing [`process.nextTick()`](https://iojs.org/api/process.html#process_process_nexttick_callback_arg) to starve I/O indefinitely.
  - This is due to adding [`setImmediate()`](https://iojs.org/api/timers.html#timers_setimmediate_callback_arg) in 0.10.
  - It is suggested you use `setImmediate()` over `process.NextTick()`. `setImmediate()` likely does what you are hoping for (a more efficient `setTimeout(..., 0)`), and runs after this tick's I/O. `process.nextTick()` does not actually run in the "next" tick anymore and will block I/O as if it were a synchronous operation.
  - Refs: [`0761c90`](https://github.com/nodejs/node/commit/0761c90204d7a0134c657e20f91bd83bfa6e677a), [`9a6c085`](https://github.com/nodejs/node/commit/9a6c0853bc164ad2d76f51cdcb0771e881cd0a5f)
- [`process.send()`](https://github.com/nodejs/node/pull/1978) is now always asynchronous, where previously it was blocking on Unix.
    - Pull request [#2620](https://github.com/nodejs/node/pull/2620), which should land before 4.0.0, will make `send()` accept a callback as the last argument, with will be called with one argument: `null` if it succeeded, or an `Error` if it failed.
    - Refs: [#760](https://github.com/nodejs/node/issues/760), [#2620](https://github.com/nodejs/node/pull/2620)

#### Signal handling

In node 0.10.x, exit from a fatal signal was accomplished by a signal handler in
node which called `exit(128 + signo)`.  So for `SIGINT` (signal 2), a node process
observing the exit of a spawned node process would observe that process exiting 130,
but no signal would be noted (see [`waitid(2)`](http://pubs.opengroup.org/onlinepubs/9699919799/functions/waitid.html) for more information on how a process
waiting for another determines if the waitee exited due to a signal).  In node
0.12.x, a node process observing the exit of a spawned child node process will
see a null `code`, and a `'SIGINT'` as the signal.

Here is a pair of test programs which illustrates the difference.

    $ cat sleeper.js
    setTimeout(function () {}, 300000)

    $ cat test.js
    var cp = require("child_process")
    var p = cp.spawn("node", ["sleeper.js"])
    p.on('exit', function (code, signal) {
      console.log("code=" + code + ", signal=" + signal)
    })
    setTimeout(function () { p.kill('SIGINT') }, 2000)


On node 0.10 this produces:

    $ node test.js
    code=130, signal=null

On node 0.12+ this produces:

    $ node test.js
    code=null, signal=SIGINT

This can be a subtle porting issue for multi-process node environments which care
about signals (such as test harnesses).  This change was introduced by
[`c61b0e9`—`main: Handle SIGINT properly`](https://github.com/joyent/node/commit/c61b0e9cbc748c5e90fc5e25e4fb490b4104cae3).

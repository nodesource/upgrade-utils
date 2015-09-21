[[Docs](https://iojs.org/api/timers.html)]

- Updated [`setImmediate()`](https://iojs.org/api/timers.html#timers_setimmediate_callback_arg) to process the full queue each turn of the event loop, instead of one per queue.
  - It is suggested you use `setImmediate()` over `process.NextTick()`. `setImmediate()` likely does what you are hoping for (a more efficient `setTimeout(..., 0)`), and runs after this tick's I/O. `process.nextTick()` does not actually run in the "next" tick anymore and will block I/O as if it were a synchronous operation.
  - Refs: [`fa46483`](https://github.com/nodejs/node/commit/fa46483fe203f56dccd6e122573857cc2c322220)
- `setImmediate()`'s timing was adjusted slightly, but is still after `process.nextTick()` and I/O, but before regular timeouts and intervals.
  - Refs: [`cd37251`](https://github.com/nodejs/node/commit/cd372510bb504b6d3414b01cc8c9ee457b2e16c4)
- Internal timeouts now run in a separate queue with slightly different semantics, and will never keep the process alive on their own.
  - This may effect your performance profile.
  - It is strongly advised you do not attempt to use `_unrefActive()` as it will probably be hidden in the future.
  - Refs: [`f46ad01`](https://github.com/nodejs/node/commit/f46ad012bc5a40194242ea1e9669c9cc25bd7047)
- Timer globals (i.e. `setTimeout()`) are no longer lazy-loaded.
  - Refs: [`2903410`](https://github.com/nodejs/node/commit/2903410aa8)

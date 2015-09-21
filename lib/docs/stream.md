[[Docs](https://iojs.org/api/stream.html)]

The changes to streams are not as drastic as the transition from streams1 to streams2: they are a
refinement of existing ideas, and should make the API slightly less surprising for humans and faster
for computers. As a whole the changes are referred to as "streams3", but the changes should largely go
unnoticed by the majority of stream consumers and implementers.

#### Readable Streams

The distinction between "flowing" and "non-flowing" modes has been refined. Entering "flowing" mode is
no longer an irreversible operation&mdash;it is possible to return to "non-flowing" mode from "flowing" mode.
Additionally, the two modes now flow through the same machinery instead of replacing methods. Any time
data is returned as a result of a [`.read()`](https://iojs.org/api/stream.html#stream_readable_read_size) call that data will *also* be emitted on the [`'data'`](https://iojs.org/api/stream.html#stream_event_data) event.

As before, adding a listener for the [`'readable'`](https://iojs.org/api/stream.html#stream_event_readable) or `'data'` event will start flowing the stream; as
will piping to another stream.

#### Writable Streams

The ability to "bulk write" to underlying resources has been added to `Writable` streams. For stream
implementers, one can signal that a stream is bulk-writable by specifying a [_writev](https://iojs.org/api/stream.html#stream_writable_writev_chunks_callback) method.
Bulk writes will occur in two situations:

1. When a bulk-writable stream is clearing its backlog of buffered write requests,
2. or if an end user has made use of the new [`.cork()`](https://iojs.org/api/stream.html#stream_writable_cork) and [`.uncork()`](https://iojs.org/api/stream.html#stream_writable_uncork) API methods.

`.cork` and `.uncork` allow the end user to control the buffering behavior of writable streams separate
from exerting backpressure. `.cork()` indicates that the stream should accept new writes (up to `.highWaterMark`),
while `.uncork()` resets that behavior and attempts to bulk-write all buffered writes to the underlying resource.

The only core stream API that **currently** implements `_writev()` is [`net.Socket`](https://iojs.org/api/net.html#net_class_net_socket).

In addition to the bulk-write changes, the performance of repeated small writes to non-bulk-writable streams
(such as `fs.WriteStream`) has been drastically improved. Users piping high volume log streams to disk should
see an improvement.

For a detailed overview of how streams3 interact, [see this diagram](https://cloud.githubusercontent.com/assets/37303/5728694/f9a3e300-9b20-11e4-9e14-a6938b3327f0.png).

- [`WritableState.prototype.buffer`](https://iojs.org/api/stream.html#stream_buffering) has been deprecated in favor of `_writableState.getBuffer()`, which builds an array from an internal object single-way linked list.
  - Mutating the array returned will have no effect as `getBuffer()` constructs it from the linked list. However modifying one of the array's element's `.next` property will effect the list.
  - Refs: [`9158666`](https://github.com/nodejs/node/commit/91586661c983f45d650644451df73c8649a8d459)
- `WritableStream.prototype._write()` now gets called with `'buffer'` encoding when chunk is a `Buffer`.
  - Refs: [joyent/node#6119](https://github.com/joyent/node/issues/6119)
- Writable streams now emit `'finish'` on the next tick if there was a `write()` when finishing.
  - Refs: [joyent/node#6118](https://github.com/joyent/node/issues/6118)

#### Transform Streams

- When in `objectMode`, `Transform.prototype._read()` now processes false-y (but not `null`) values, such as `''`, `0`, etc.
  - Refs: [`26ca7d7`](https://github.com/nodejs/node/commit/26ca7d73ca9c45112f33579aa5a1293059010779)

[[Docs](https://iojs.org/api/buffer.html)]

- External memory is now allocated using [TypedArrays](https://developer.mozilla.org/en/docs/Web/JavaScript/Typed_arrays), instead of using `SlowBuffer` or `smalloc` as the parent backing.
  - Refs: [`63da0df`](https://github.com/nodejs/node/commit/63da0dfd3a4460e117240e84b57af2137469497e)

---

- [`Buffer.concat()`](https://iojs.org/api/buffer.html#buffer_class_method_buffer_concat_list_totallength) now always creates a new buffer, even if only called with one element.
  - Refs: [`f4f16bf`](https://github.com/nodejs/io.js/commit/f4f16bf03980df4d4366697d40e80da805a38bf8), [#1891](https://github.com/nodejs/io.js/issues/1891), [#1937](https://github.com/nodejs/io.js/pull/1937)
- [`SlowBuffer`](https://iojs.org/api/buffer.html#buffer_class_slowbuffer) has been repurposed to return a `Buffer` instance who's parent backing is not pooled.
  - Refs: [`456942a`](https://github.com/nodejs/node/commit/456942a920fe313ebe0b0da366d26ef400ec177e)
- [`Buffer.prototype.toJSON()`](https://iojs.org/api/buffer.html#buffer_buf_tojson)'s output is no longer the same as an array. Instead it is an object specifically tagged as a buffer, which can be recovered by passing it to (a new overload of) the `Buffer` constructor.
  - Refs: [`840a29f`](https://github.com/nodejs/node/commit/840a29fc0fd256a63b3f2f5e7528de5107a608a3)
- `Buffer.prototype.parent` is now a getter that points to `buffer.buffer` if the buffer's size is greater than zero.
  - Refs: [`63da0df`](https://github.com/nodejs/node/commit/63da0dfd3a4460e117240e84b57af2137469497e)
- `Buffer.prototype.offset` is now a read-only getter that returns `buffer.byteOffset`.
  - Refs: [`63da0df`](https://github.com/nodejs/node/commit/63da0dfd3a4460e117240e84b57af2137469497e)
- [`Buffer.prototype.fill()`](https://iojs.org/api/buffer.html#buffer_buf_fill_value_offset_end) now accepts multi-character strings and will fill with the entire passed value. Additionally, `fill()` now returns its `buffer` and can be chained.
  - Refs: [`57ed3da`](https://github.com/nodejs/node/commit/57ed3daebfe4700b14cd551f50240f1a634dbd64)
- `Buffer.prototype._charsWritten` no longer is written to, nor exists.
  - Refs: [`ccda6bb`](https://github.com/nodejs/node/commit/ccda6bb3ac99ee46508860385128f47a3d5547e5)

#### Buffer changes from V8

Implementation changes in V8 have caused subtle impacts how buffers work with encodings in certain cases.

- `(new Buffer('text\0!', 'ascii')).toString()` outputs `'text !'` in 0.10 and `'text\u0000!'` in 0.12.
- Invalid unicode characters are replaced to no longer become invalid.
 - Refs: [#2344](https://github.com/nodejs/node/issues/2344)

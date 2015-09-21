[[Docs](https://iojs.org/api/dgram.html)]

- [`dgram.Socket.prototype.send()`](https://iojs.org/api/dgram.html#dgram_socket_send_buf_offset_length_port_address_callback) error semantics have changed.
  - Through 2.x, the the dgram `socket.send()` method emitted errors when a DNS lookup failed, even when a callback was provided. Starting from 3.0.0, if a callback is provided, no error event will be emitted.
  - When `send()` is supplied with a callback, it will no longer emit the `'error'` event when an error occurs and instead pass the error to the callback.
  - Previously the behavior was to do _both_.
  - Refs: [#1796](https://github.com/nodejs/io.js/pull/1796)

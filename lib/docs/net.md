[[Docs](https://iojs.org/api/net.html)]

- [`net.Server.prototype.address()`]() now also returns a `{ address: '/path/to/socket' }` object, like it does for TCP and UDP sockets.
  - Previously it returned `socket._pipeName` directly for unix sockets.
  - Refs: [`f337595`](https://github.com/nodejs/node/commit/f337595441641ad36f6ab8ae770e56c1673ef692)
- [`net.Server.prototype.listen()`](https://iojs.org/api/net.html#net_server_listen_port_hostname_backlog_callback) will now try to bind to `::` (IPv6) if the bind address is omitted, and use `0.0.0.0` (IPv4) as a fallback.
  - Refs: [`2272052`](https://github.com/nodejs/node/commit/2272052461445dfcae729cc6420a3d3229362158)

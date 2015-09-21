[[Docs](https://iojs.org/api/fs.html)]

- [`fs.createReadStream()`](https://iojs.org/api/fs.html#fs_fs_createreadstream_path_options) and [`fs.createWriteStream()`](https://iojs.org/api/fs.html#fs_fs_createwritestream_path_options) now have stricter type-checking for the `options` argument.
  - Refs: [`353e26e`](https://github.com/nodejs/node/commit/353e26e3c7)
- [`fs.exists()`](https://iojs.org/api/fs.html#fs_fs_exists_path_callback) is now deprecated. It is suggested to use either [`fs.access()`](https://iojs.org/api/fs.html#fs_fs_access_path_mode_callback) or [`fs.stat()`](https://iojs.org/api/fs.html#fs_fs_stat_path_callback). Please read the documentation carefully.
- Added more informative errors and method call site details when the `NODE_DEBUG` environment is set to ease debugging.
  - The same thing applies to the synchronous versions of these APIs.
  - Refs: [`1f76a2e`](https://github.com/nodejs/node/commit/1f76a2eddc3561ff2c434d491e0d2b893c374cfd)
- Fixed missing callbacks errors just being printed instead of thrown.
  - Refs: Probably [`1f40b2a`](https://github.com/nodejs/node/commit/1f40b2a63616efe0e4c0744a1f630161526e4236)
- On Unix soft `ulimit` values are ignored.
  - Refs: [`6820054`](https://github.com/nodejs/node/commit/6820054d2d42ff9274ea0755bea59cfc4f26f353), [joyent/node#8704](https://github.com/joyent/node/issues/8704)
- Errors for async `fs` operations are now thrown if a callback is not present.
  - Refs: [`a804347`](https://github.com/nodejs/node/commit/a80434736bce22a9ac00376bb5786806752ef3dd), [`6bd8b7e`](https://github.com/nodejs/node/commit/6bd8b7e5405e1cdc9f56214f5f6b741806c32e5f), [`5e140b3`](https://github.com/nodejs/node/commit/5e140b33e58bd0ac6779fb0cb635dd51e1a27289)
- The error messages of most `fs` errors have been improved to be more descriptive and useful.
  - Refs: [`bc2c85c`](https://github.com/nodejs/node/commit/bc2c85ceef7ac034830e4a4357d0aef69cd6e386)


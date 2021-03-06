[[Docs](https://iojs.org/api/util.html)]

- `util.is*()` (`isArray()` ... `isUndefined()`) type-checking functions were added in 0.12 but are scheduled for deprecation. Please use user-land solutions instead.
  - The type checking these use will be come brittle with the eventual addition of `Symbol.toStringTag`.
  - Refs: [#2447](https://github.com/nodejs/node/pull/2447)
- Updated [`util.format()`](https://iojs.org/api/util.html#util_util_format_format) to receive several changes:
  - `-0` is now displayed as such, instead of as `0`.
    - Refs: [`b3e4fc6`](https://github.com/nodejs/node/commit/b3e4fc6a48b97b52bd19de43c76b7082dcab4988)
  - Anything that is `instanceof Error` is now formatted as an error.
    - Refs: [`684dd28`](https://github.com/nodejs/node/commit/684dd28a6c684532336777348875ac11305727b9)
  - Circular references in JavaScript objects are now handled for the `%j` specifier.
    - Refs:  [`2cd7adc`](https://github.com/nodejs/node/commit/2cd7adc7f44e4dfe440162a31a168e6aa9a8cea1)
  - Custom `inspect` functions now receive any arguments passed to `util.inspect`.
    - Refs: [`07774e6`](https://github.com/nodejs/node/commit/07774e6b9570f90166a54fa87af74b8a7cf9926a)
  - Displays the constructor name if available.
    - Refs: [`7d14dd9`](https://github.com/nodejs/node/commit/7d14dd9b5e78faabb95d454a79faa513d0bbc2a5)
- The following utilities were deprecated in [`896b2aa`](https://github.com/nodejs/node/commit/896b2aa7074fc886efd7dd0a397d694763cac7ce):
  - `util.p()`, `util.debug()`, `util.error()` — Use [`console.error()`](https://iojs.org/api/console.html#console_console_error_data) instead.
  - `util.print()`, `util.puts()` — Use [`console.log()`](https://iojs.org/api/console.html#console_console_log_data) instead.
  - `util.exec()` — Now found at [`child_process.exec()`](https://iojs.org/api/child_process.html#child_process_child_process_exec_command_options_callback).
  - `util.pump()` — Use [`ReadableStream.prototype.pipe()`](https://iojs.org/api/stream.html#stream_readable_pipe_destination_options) instead.

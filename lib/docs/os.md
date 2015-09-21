[[Docs](https://iojs.org/api/os.html)]

- [`os.tmpdir()`](https://iojs.org/api/os.html#os_os_tmpdir) now never returns a trailing slash regardless of the host platform.
  - Refs: [`bb97b70`](https://github.com/iojs/io.js/commit/bb97b70eb709b0e0470a5164b3722c292859618a), [#747](https://github.com/iojs/io.js/pull/747)
- `os.tmpdir()` on Windows now uses the `%SystemRoot%` or `%WINDIR%` environment variables instead of the hard-coded value of `c:\windows` when determining the temporary directory location.
  - Refs:  [`120e5a2`](https://github.com/nodejs/node/commit/120e5a24df76deb5019abec9744ace94f0f3746a)

[[Doc](https://iojs.org/api/tls.html)]

- The [tls server option `SNICallback`](https://iojs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener) required returning a `secureContext` synchronously as `function (hostname) { return secureContext; }`. The function signature is now asyncronous as `function (hostname, cb) { cb(null, secureContext); }`. You can feature detect with `'function' === typeof cb`.
  - Refs: [`048e0e7`](https://github.com/nodejs/node/commit/048e0e77e0c341407ecea364cbe26c8f77be48b8)
- The [tls server option `dhparam`](https://iojs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener) must now have a key length greater than 1024 bits, or else it will throw an error.
  - This is effectively a security fix. Please see https://weakdh.org/ for more information.
  - Refs: [`9b35be5`](https://github.com/nodejs/node/commit/9b35be5810)
- RC4 is now disabled on the cipher list.
  - RC4 is now considered insecure and has been removed from the list of default ciphers for TLS servers. Use the `ciphers` option when starting a new TLS server to supply an alternative list.
  - Refs: [#826](https://github.com/nodejs/io.js/pull/826)
  - Potentially mitigated if [archive#39](https://github.com/nodejs/node-convergence-archive/issues/39) is merged.
- Implemented TLS streams in C++, boosting their performance.
  - Refs: [`1738c77`](https://github.com/nodejs/node/commit/1738c7783526868d86cb213414cb4d40c5a89662)
- Moved & renamed `crypto.createCredentials()` to [`tls.createSecureContext()`](https://iojs.org/api/tls.html#tls_tls_createsecurecontext_details).
  - Refs: [`5d2aef1`](https://github.com/nodejs/node/commit/5d2aef17ee56fbbf415ca1e3034cdb02cd97117c)
- Removed SSLv2 and SSLv3 support.
  - Both SSLv2 and SSLv3 are now considered too insecure for general use and have been disabled at compile-time.
  - Refs: [#290](https://github.com/nodejs/node/pull/290), [#315](https://github.com/nodejs/node/pull/315), [archive#20](https://github.com/nodejs/node-convergence-archive/issues/20)

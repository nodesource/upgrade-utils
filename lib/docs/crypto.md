[[Docs](https://iojs.org/api/crypto.html)]

- [`crypto.randomBytes()`](https://iojs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) now blocks if there is insufficient entropy.
  - Although it blocks, it should normally never take longer than a few milliseconds.
  - `crypto.pseudoRandomBytes()` is now an alias to `crypto.randomBytes()`.
  - Refs: [`e5e5980`](https://github.com/nodejs/node/commit/e5e598060eb43faf2142184d523a04f0ca2d95c3)
- [`crypto.Sign.prototype.sign()`](https://iojs.org/api/crypto.html#crypto_sign_sign_private_key_output_format) will no longer swallow internal OpenSSL errors.
  - Refs: [`00bffa6`](https://github.com/nodejs/node/commit/00bffa6c758038dca039fd9114912c0430114c08)

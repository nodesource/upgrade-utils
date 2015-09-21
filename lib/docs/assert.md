[[Docs](https://iojs.org/api/assert.html)]

- [`assert.deepEqual()`](https://iojs.org/api/assert.html#assert_assert_deepequal_actual_expected_message) no longer checks for `prototype` equality.
  - [`assert.deepStrictEqual()`](https://iojs.org/api/assert.html#assert_assert_deepstrictequal_actual_expected_message) was introduced to deal with some former expectations about `deepEqual()` which were not true.
  - Refs: [`e7573f9`](https://github.com/nodejs/node/commit/e7573f9111f6b85c599ec225714d76e08ec8a4dc), [`3f473ef`](https://github.com/nodejs/node/commit/3f473ef141fdc7059928ebc4542b00e2f126ab07)

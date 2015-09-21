[[Docs](https://iojs.org/api/url.html)]

- [`url.parse()`](https://iojs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost) will now always return a query object and search string, even if they are empty, when `parseQueryString` (the second argument) is set to `true`.
  - e.g. a `url.parse(..., true)` return value will now include `{ search: '', query: {} }` where previously both properties would not exist.
  - Refs: [`b705b73`](https://github.com/nodejs/node/commit/b705b73e46193c7691be40b732330a49affacedb)
- `url.parse()` now escapes the following characters and spaces (`' '`) in the parsed object's properties:
  ```
  < > " ` \r \n \t { } | \ ^ '
  ```
  - e.g.
  ```
  url.parse("http://example.com/{z}/{x}/{y}.png#foo{}").href === 'http://example.com/%7Bz%7D/%7Bx%7D/%7By%7D.png#foo%7B%7D'
  ```
  - Refs: [#2605](https://github.com/nodejs/node/pull/2605), [#2113](https://github.com/nodejs/node/issues/2113)
- [`url.resolve()`](https://iojs.org/api/url.html#url_url_resolve_from_to) now resolves properly to `'.'` and `'..'`.
  - This means that `resolve('/a/b/', '.')` will return `'/a/b/'`, and `resolve('/a/b', '.')` will return `'/a/'`.
  - `resolve('/a/b/', '..')` returns `'/a/'`.
  - This change, while technically a potentially breaking change, also landed in node 0.10.37.
  - Refs: [`faa687b`](https://github.com/nodejs/node/commit/faa687b4be2cea71c545cc1bec631c164b608acd), [#278](https://github.com/nodejs/io.js/pull/278)

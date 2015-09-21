[[Docs](https://iojs.org/api/path.html)]

- [`path.isAbsolute()`](https://iojs.org/api/path.html#path_path_isabsolute_path) will now always return a boolean, even on windows.
  - Refs: [`20229d6`](https://github.com/nodejs/node/commit/20229d6896ce4b802a0789b1d2643dcac55bebb9)
- Many `path` functions now assert that any paths provided are strings.
  - Refs: [`eb995d6`](https://github.com/nodejs/node/commit/eb995d682201018b2a47c44e921848cfa31486a2), [`8de78e4`](https://github.com/nodejs/node/commit/8de78e470d2e291454e2184d7f206c70d4cb8c97)

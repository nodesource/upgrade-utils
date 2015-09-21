[[Docs](https://iojs.org/api/vm.html)]

- The `vm` module has been rewritten to work better, based on the excellent [Contextify](https://github.com/brianmcd/contextify) native module. All of the functionality of Contextify is now in core, with improvements!
  - Refs: [`7afdba6`](https://github.com/nodejs/node/commit/7afdba6e0bc3b69c2bf5fdbd59f938ac8f7a64c5)
- Updated [`vm.createContext(sandbox)`](https://iojs.org/api/vm.html#vm_vm_createcontext_sandbox) to "contextify" the sandbox, making it suitable for use as a global for `vm` scripts, and then return it. It no longer creates a separate context object.
  - Refs: [`7afdba6`](https://github.com/nodejs/node/commit/7afdba6e0bc3b69c2bf5fdbd59f938ac8f7a64c5)
- Updated most `vm` and `vm.Script` methods to accept an `options` object, allowing you to configure a timeout for the script, the error display behavior, and sometimes the filename (for stack traces).
  - Refs: [`fd36576`](https://github.com/nodejs/node/commit/fd3657610e49005dfc778c3f060dbba0a34f286a)
- Updated the supplied sandbox object to be used directly as the global, remove error-prone copying of properties back and forth between the supplied sandbox object and the global that appears inside the scripts run by the `vm` module.
  - Refs: [`7afdba6`](https://github.com/nodejs/node/commit/7afdba6e0bc3b69c2bf5fdbd59f938ac8f7a64c5)

For more information, see the `vm` documentation linked above.

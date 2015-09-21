[[Docs](https://iojs.org/api/domain.html)]

The domain module [has been scheduled for deprecation](https://iojs.org/api/domain.html#domain_domain), awaiting an alternative for those who absolutely **need** domains.

It is suggested you avoid using domains if possible and rather rely on regular error checking.

- [`domain.dispose()`](https://iojs.org/api/domain.html#domain_domain_dispose) has been deprecated.
  - Please recover from failed IO actions explicitly via error event handlers set on the domain.
  - Refs: [`d86814a`](https://github.com/nodejs/node/commit/d86814aeca64d8985402dc073eff1fc8ac93c231)

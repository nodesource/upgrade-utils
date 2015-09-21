[[Docs](https://iojs.org/api/cluster.html)]

- Cluster now uses round-robin load balancing by default on non-Windows platforms. The scheduling policy is configurable by setting [`cluster.schedulingPolicy`](https://iojs.org/api/cluster.html#cluster_cluster_schedulingpolicy).
    - It is advised that you do not use round-robin balancing on windows as it is very inefficien.
  - Refs: [`e72cd41`](https://github.com/nodejs/node/commit/e72cd415adf2ca12daddc001cc3fe953cdb4b507)
- Cluster has been made `--debug`-aware.
  - Refs: [`43ec1b1`](https://github.com/nodejs/node/commit/43ec1b1c2e77d21c7571acd39860b9783aaf5175), [`3821863`](https://github.com/nodejs/node/commit/3821863109be9e56f41f1ea6da0cb6e822037fc3), [`11c1bae`](https://github.com/nodejs/node/commit/11c1bae734dae3a017f2c4f3f71b5e679a9ddfa6), [`423d894`](https://github.com/nodejs/node/commit/423d8944ce58bc8c3f90d2827339a4dea10ab96e)
- Cluster's [`'setup'`](https://iojs.org/api/cluster.html#cluster_event_setup) event now fires asynchronously.
  - Refs: [`876d3bd`](https://github.com/nodejs/node/commit/876d3bd85aabe7fce71a025a89c6b3f6ddbf2053)
- Open connections (and other handles) in the master process are now closed when the last worker that holds a reference to them quits. Previously, they were only closed at cluster shutdown.
  - A side-effect of this is that the cluster master will refuse connections if there are no workers.
  - Refs: [`41b75ca`](https://github.com/nodejs/node/commit/41b75ca9263f368db790fbdcc3963bb1a8c5cb7e), [#2606](https://github.com/nodejs/node/pull/2606),  [#1239](https://github.com/nodejs/node/issues/1239)

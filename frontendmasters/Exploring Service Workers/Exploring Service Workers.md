# Exploring Service Workers

By Kyle Simpson



**Literally every website today should have a service worker.**

Caching in the browser is so much more complex than we think.

We forget the fact that **customers are mobile.**

We have made these terrible assumptions that people will have a continuous web experience. That is not the experience most people have, only a small percentage of people have that kind of experience.

Caching technology is complex.

## Web Workers

Web Worker: a JavaScript that runs on a separate thread from the web page thread.

Use cases are for intensive operations.

**Key Idea**: offload process intensive operations to the web worker

Things to be aware of:

- all the browser guarantees is if you have a web worker, it will be on a separate thread
- multiple workers, in general, they will often have separate threads, but there is no guarantee that each thread would be completely separated
  - very easy to denial of service someone's device if they were completely separated
- dedicated versus shared workers (not all browsers, mobile limitations)
  - shared worker: one worker that communicates with every instance
- 
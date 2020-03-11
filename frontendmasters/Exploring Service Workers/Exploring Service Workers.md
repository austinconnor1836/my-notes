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

To start a web worker:

```javascript
var worker = new Worker("/js/worker.js");
```

Listen to messages from worker:

```javascript
worker.addEventListener("message", onMessage);
```

Process `onMessage`:

```javascript
function onMessage(evt) {
    console.log(evt.data);
}
```

In the web worker `worker.js`:

```javascript
self.postMessage("hello from web worker.");
```

#### Communicating with a Worker

From web page to web worker:
In `worker.js`:

```javascript
self.onmessage = onMessage;

function onMessage(evt) {
    console.log(`Received in web worker: ${evt.data}`);
}
```

**Data is copied, not sent by reference** when data is sent between web page and web worker.

- even a JSON object, by the "stuctured clone algorithm, " is copied

#### Data Transfer Solutions

- used to have **transferrables**, like a singleton object that is transferred between web worker and web page (have gone away from this)
- about 2 years ago, they shipped a feature called **shared array buffers** with an API that could use mutexes and semaphores, by they he means the web platform JavaScript
  - basically like the v2 of transferrables: a literal shared memory segment, that could share the info between them
  - about a year and a half ago, it was exploited by a "high resolution timer" on web pages: a timer that has down to the nanosecond precision, typically how attack vectors work
  - shared array buffers are perfect for implementing "high resolution timers"
  - no longer have shared array buffers
- **you can send copies of data**

#### Receiving Data from a worker

#### Web Workers Q&A

- you can debug web workers in Chrome's Developer tools

### Service Workers

A **service worker** is a web worker, except it lives on a different timeline than a web worker.

- at one point, they were going to call it a "network worker," which would have been more accurate to what it is doing
- it will sit between your web application and the rest of the web:
  - every single web request that happens in your application will funnel through the service worker first, if you have a service worker installed
  - you have to configure the service worker though, otherwise it will not interfere with the request
  - acts like a proxy, acting on behalf of the page
  - still bound by **CORS**
- programming a proxy that sits in the browser, opposed to on a server
  - why?
    - What are things that I could do if I could program all my network requests?
      - Bare minimum:
        - use the **Cache API** that programmatically stores resource requests instead of relying on the browser's underlying cache API

#### Use Case Brainstorming

- major use case: custom caching behavior
- 
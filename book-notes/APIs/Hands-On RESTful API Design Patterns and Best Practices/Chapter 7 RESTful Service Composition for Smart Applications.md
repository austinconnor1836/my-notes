# Chapter 7: RESTful Service Composition for Smart Applications

There are a number of integration and brokerage platforms, adapters, connectors, drivers, and plug-ins that enable **device-to-device (D2D)** and **device-to-cloud (D2C)** integration.

Topics that will be discussed:

- The need for service composition
- That various composition methods (orchestration and choreography)
- The orchestration method
- The choreography method
- The hybrid version of orchestration and choreography towards smarter applications

## Briefing RESTful microservices

The emergence of the **microservices architecture (MSA)** is being touted as the most interesting and inspiring thing for business and IT organizations across the globe.

Every digitized and connected device is being presented as microservices to the outside world.

Since every microservice is built with RESTful APIs, there's a separation between interfacing and implementation, which is technology-agnostic.

### Demystifying the Microservice Architecture style

There are agile programming models and techniques to speed up the process of writing code for software applications, but designing and delineating application components in an elegant and extensible manner is vital to the intended success of software applications in the long run.

There should not be any vendor lock-in.

Microservices are:

- fine-grained
- horizontally-scalable
- independently-deployable
- API-driven
- usable and reusable
- portable
- technology-agnostic

### The advantages of microservices

- They follow the single responsibility principle
  - do one thing at a time but do it well
- different responsibilities in different services
- cost of developing, changing, and advancing is cheap
- time to market is minimal
- each service runs in its own process space and with its own data store
- **every service needs to have an easy-to-understand and should use APIs**.
  - RESTful APIs are the most popular for API-enabled microservices.
  - this is how the services talk to one another
- they are modular (loosely coupled and highly cohesive)
  - remove dependency related risks while keeping closely-related responsibilities together
- **they emerge as the best fit for modernizing and migrating large, monolithic applications**

### The emergence of cloud-native applications


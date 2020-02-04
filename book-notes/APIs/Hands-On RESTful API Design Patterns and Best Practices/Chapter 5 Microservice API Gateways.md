# Chapter 5: Microservice API Gateways

- we will discuss the role and responsibility of API gateways in the microservice era.

Source code for the microservices: https://github.com/PacktPublishing/Hands-On-RESTful-API-Design-Patterns-and-Best-Practices

**Microservice architecture (MSA)** is all about achieving speed and safety at scale, and the MSA ecosystem is continuously growing to provide scores of competent technologies, tools, and frameworks for efficiently implementing a range of business applications and IT services.

RESTful interfacing is the most popular and lightweight entrance for services to find, bind, and use one another.

**_Ross might find this relevant for his analysis of microservices vs. monolithic architecture_**: page 209.

API gateway infrastructure is paramount for achieving the intended success of microservices architecture.

## The prominent infrastructure modules in microservice-centric applications

Key hallmarks of microservices:

- Horizontal scaling
- Independent deployment

It is clear that MSA is the prime architectural pattern and style for next-generation software applications.

Key components of MSA-compliant systems:

### Service registry

A centralized service registry/repository mechanism is needed for enabling service discovery and leveraging microservices.

The registry:

- is a sort of database for accurately containing and maintaining the network locations of the service instances
- should have a cluster of the service registry module to meet the high-availability requirement.
- should not cache the network location details at the API gateway or the registry-aware client (it may degrade performance).

The API gateway, on getting requests from client microservices, connects and tries to procure the location details of the serving microservices.

Every microservice must register with the centralized service registry on startup and de-register upon shutdown.

## Service discovery

In the traditional legacy (monolithic) IT environment, applications run at fixed and well-known locations.

- applications can be easily found and used.

However, in the agile and adept microservices era, the number of microservices and their instances are changing frequently.

They are also being redeployed in other locations.

An advanced service discovery mechanism is thus needed.

Two main service discovery patterns: **client-side** and **server-side discovery**

![client and server discovery](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/client-server-discovery.png)

### Composition/orchestration

Microservices must be linked together.

For ensuring composition there are two methods: **orchestration** and **choreography**.

There are also static and dynamic compositions.

![orchestration](images/orchestration.png)

### Transformation

Since their are so many different client-side devices, like IoT devices, browsers for resource constrained devices, web and mobile applications, etc., the client side of any application and service has to be worked out separately.

There are synchronous and asynchronous communication protocols.

The API gateway facilitates translation and other transformation needs quite comfortably.

### Monitoring

Every service request/response gets routed through API gateways.

Monitoring is indispensable for ensuring service reliability and stability.

The essential metrics to be faithfully considered include:

- the total number of requests being sent out for an API for a period of time
- the performance/throughput value
- the number of successful and exception messages received
- the number of blocked messages by API gateway

Request categorization is also important to anticipate any kind of spike or surge with greater accuracy and prediction.

### Load balancing and scaling

The goal of achieving application scalability (horizontal) through infrastructure elasticity is accomplished by leveraging a **load balancer (LB)** (software or hardware).

Traffic information is important to have for a load balancer.

We do not want an API gateway to be a single point of failure.

To have a clustered API gateway setup, we can have a load balancer in front of the API gateway.

This means that multiple instances of an API gateway solution can be leveraged to ensure continuity.

They have the same configuration, which helps in virtualizing the same APIs and to excute the same policies.

API gateways are stateless to not be weighed down by state information.

Using multiple instances of an API gateway ensures zero downtime. While one is being updated, it cannot accept requests, but the remaining instances can.

The **key role of the load balancer** here is to ensure all the incoming requests are pushed to the correct API gateway instances that are receiving and processing fresh requests.

API gateway clustering is important for continuously receiving and responding to service messages and the **Load Balancer** plays a vital role in fulfilling this:

![load balancer](images/load-balancer.png)

### High availability and failover

API gateways are the only entry point for microservices to find and talk with one another to fulfill business tasks.

To achieve high availability and stability, the recommended action and approach is to deploy the API gateway in **high availability (HA)** mode.

As stated before, API gateway instances are clustered behind a load balancer. The load balancer continuously probes the API gateway instances to understand whether they are alive or not.

If the load balancer determines a gateway is failing, it redirects and routes inbound traffic to the next instance that is functioning properly.

Generally, API gateways are stateless. But they can maintain cached data, which can be replicated across a cluster of API gateways. This arrangement helps maintain the peer-to-peer relationship among API gateway instances.

#### High availability and failover guidelines

Guidelines developed by experts:

- In order to guarantee maximum availability, an API gateway has to be used in proven active/active mode.
- There is a need for deeper and decisive analysis on traffic data. The insights from this analysis help operators and others manning production environments to plan and protect against message flooding.
- Tool-supported automated network infrastructure monitoring and management are essential for ensuring the highest availability. Not only collecting operational and log data, but also subjecting them to a variety of investigations unravels a lot of useful and usable information. All the knowledge thus discovered and disseminated goes a long way in empowering the network infrastructure to work in prime and pristine condition. The analytics feature intrinsically embedded in an API gateway solution comes in handy in analyzing and articulating what to do to prevent any kind of failure and faltering. There are specific as well as agnostic monitoring tools, which can be integrated with knowledge visualization/report generation tools.

### Governance

Established policies are vital for monitoring and managing an increasing set of APIs.

They can be broadly categorized as **design-time** and **runtime** governance.

## About API gateway solutions

In a nutshell, an API gateway is a multifaceted proxy that accomplishes a variety of integration, intermediation, and enrichment tasks.

Its responsibilities are performed after the initial request verification, content filtering, authentication, and authorization.

Common features of any API gateway solution:

- authentication and authorization
- message enrichment
- mediation
- process-based composition
- traffic routing and management
- service monitoring

It is bound to provide a single and unified API entry point across one or more internal APIs.

There can be a variety of clients requesting it and expect appropriate responses.

The gateway is supposed to do a variety of tasks including:

- initiation
- intermediation
- implementation

In short, an API gateway can help provide a **unified entry point for external consumers.**


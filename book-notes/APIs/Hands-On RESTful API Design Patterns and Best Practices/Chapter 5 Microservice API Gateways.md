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


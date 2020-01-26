# Chapter 1: Introduction to the Basics of RESTful Architecture

## Learning about Web 3.0

Web 3.0 is generally referred to as executing semantic web, or read-write-execute web.

The semantic web layers are **Static Web**, **Translations**, and **Rich Internet Applications (RIA)** or **Rich Web**.

![semantic layers](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/semantic-layers.png)

## Learning about web service architecture

Standardized communication protocols:

- **XML/JSON**: provides metadata for the data that it contains
- **SOAP (Simple Object Access Protocol)**: used to transfer data
- **WSDL**: used for defining available services to be consumed
- **UDDI**: has the list of services available

**Web services architecture (WSA)** has three significant roles:

- **Service Provider**
- **Service Consumer**
- **Service Broker**

![WSA](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/wsa.png)

The **Service Requestor** finds the **Service Provider** through **UDDI**, and contacts the provider using the **Simple Object Access Protocol (SOAP)**. The **Service Provider** then validates the service request and responds to the requestor with XML/JSON as a service response.

## Discussing the web API

We have yet to touch upon REST-based communication.

RESTful APIs do not use/require XML-based web service protocols, such as SOAP or WSDL, to support their interfaces, but they use simplified representations instead.

Some of the key terminologies that we will come across concerning web APIs are endpoint, **uniform resource identifier (URI)**, and resources.

The web API is an API for *either* a web server or for a web browser.

Some of the many categories of APIs include: SOAP, XM-RPC, JSON-RPC, REST, and so on.

## Learning about service-oriented architecture

SOA defines some standars and lays down best approaches to design and develop a web service.

Any web service **is the logical representation of repeatable business activities that have a specified outcome.**

SOA is a black box (or abstract) to the service consumer who consumes it.

A SOA can also integrate with other SOAs.

Services are applications hosted on application servers and interact with other applications through interfaces.

## Learning about resource-oriented architecture

ROA is a foundation of the semantic web.

Any business entity can be represented as a resource, and it can be made accessible through a URI.

| **Objects in object-oriented architecture** | **Resources in ROA**                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| Every entity is defined as an object        | Entities are services                                        |
| An object has attributes and actions        | A service has descriptions and contracts                     |
| Objects need to maintain state to interact  | Interacts over the network with a defined location or address |

## The benefits of ROA

- **Independent of client contracts**
- **Explicit state**
- **Scalability and performance**

## Beginning with REST

The fundamental principle of REST is to use the **HTTP** protocol for data communication (between distributed hypermedia systems), and it revolves around the concept of resources where each and every component considered as a resource, and those resources are accessed by the common interfaces using **HTTP** methods.

![ROA/REST](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/roa-rest-example.png)

This diagram shows you where REST stands in the ROA architecture and how it can be accessed by different consumers.

REST is an architectural style.

## REST architecture style constraints

REST constraints or design rules:

- Client-server
- Statelessness
- Cacheable
- Uniform interface
- Layered systems
- Code on demand

## Beginning with client-server

The client-server architectural model helps in the separation of concerns between the user interface and data storage.

The client basically sends a request for a service, and the server returns a response.

For this communication to happen efficiently, it is necessary to have a well-defined communication protocol that lays down the rules of communication, such as the format of request messages, response messages, error handling, and so on.

All communication protocols that are used for client-server communication work in the **application layer** of the protocol stack.

## The service in client-server architecture

**Service**: refers to the abstraction of a resource in a client-server architecture.

- a **web server** provides web pages
- a **file server** provides files

The server must have an appropriate scheduler for handling incoming requests.

## Understanding statelessness

The statelessness constraint helps services to be more scalable and reliable.

The restrictions necessary to achieve statelessness:

- The client is responsible for:
  - storing and handling all the application states and the related information on the client side.
  - sending any state information to the server whenever it's needed.

- HTTP interactions involve two kinds of states:
  - **application state**:
    - the data that is stored on the server side and helps to identify the incoming client request, using the previous interaction details with current context information
  - **resource state**:
    - referred to as resource representation, and it is independent of the client (the client doesn't need to know this state unless it is available as response is needed), and this is the current state of the server at any given point in time

## Caching constraint in REST

**Caching** is the ability to store frequently accessed data (a response in this context) to serve the client requests, and never having to generate the same response more than once until it needs to be.

Caching strategies or mechanisms available:

- browser caches
- proxy caches
- gateway caches (reverse-proxy)

Several ways to control cache behavior:

- pragma
- expiration tags and so on.

**You can attach cache control headers to HTTP requests to control cache behavior.**

## Understanding the uniform interface

HTTP Methods + Resource names = Uniform Interfaces

Fielding's four guiding principles that constitute the necessary constraints to satisfy the uniform interface:

- Identification of resources
- Manipulation of resources
- Self-descriptive messages
- Hypermedia as the engine of application state

## Identification of resources

- The semantics of the mapping of the URI to a resource **must not change.** 
- **MIME (Multipurpose Internet Mail Extension)**: the list of possible well-defined formats or media types the client will understand (JSON, XML, HTML, PNG, SVG).
- The application needs to support more than one representation of the same resource and the same URI.
- For example: a document might be represented as JSON to an automated program, but as HTML to a web browser.
- This allows the resource to be represented in different ways **without changing its identifiers.**
- **The decoupling of the resource's representation from the URI is one to the crucial aspects of REST.**

## Self-descriptive messages

A client's request and server's response are messages that should be stateless and self-descriptive.

## Hypermedia as the Engine of Application State (HATEOAS)

**HATEOAS is one of the most critical constraints**; without addressing it, services cannot be termed RESTful services.

It is built on the **RMM (Richardson Maturity Model)**:

![RMM](/home/austin/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/rmm.png)

An API is fully qualified to be a RESTful API only when it scores **Level-3**.

Some media types work well (in harmony) with the web, and they are called **hypermedia** formats. The formats that host URIs and links are hypermedia formats.

*Plain old XML is not hypermedia-friendly as it doesn't carry the links and protocols.*

The following diagram depicts a sample JSON response from a server without and then **With HATEOAS** (with links and HREFs):

![HATEOAS](/home/austin/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/hateoas.png)

To recap:

- HATEOS means an application state representation (resource) that includes links to related resources. The absence or presence of a link on a page is an essential part of the resource's current state and so is essential for the RESTful APIs.
- the URI should stay the same regardless of the many changes its representations go through.

## Layered systems

Layered systems consist of layers that communicate only with the layer above or below them. They also rely on the layers below it to perform its functions.

## Code on demand

In distributed computing, **code on demand (COD)** is any technology that enables the server to send the software code to the clients to be executed on the client computer upon request from the client's software.

- an example would be JavaScript.

*COD  is classified as optional; architectures that do not use this feature can still be considered RESTful.*

## RESTful service mandates

Mandatory constraints for any web service to be qualified as RESTful:

- Client-server
- Statelessness
- Cache
- Interface/uniform contract
- Layered system
- The optional REST constraint is COD (architectures that do not use this feature can still be considered RESTful)

## Architectural goals of REST

Properties of REST that help to establish the design goals that are embedded in the application of REST constraints:

- Performance
- Scalability
- Simplicity
- Modifiability
- Visibility
- Portability
- Reliability
- Testability


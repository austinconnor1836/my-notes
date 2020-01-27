# Chapter 2: Design Strategy, Guidelines and Best Practices

The challenge to meet: *any time, anywhere* and *any device.*

Fundamental design concepts:

- **Affordance**
- **Loosely coupled**
- **Leverage existing web architecture**

## Affordance

**Affordance**: how an object and its properties are perceived by its design.

- book example showed turning a dial and flipping a switch

## Loosely coupled

In a loosely coupled design, APIs are independent, and modifications in one won't impact the operation of consumers.

## Leverage web architecture

HTTP is the lifeline of the web architecture, and it powers every single client request, server response, and transfer of a document/content over all of the web.

RESTful APIs should take advantage of HTTP methods, or verbs, such as `GET`, `PUT`, and `POST` defined by the RFC 2616 protocol.

*RFC 2616 (https://tools.ietf.org/html/rfc2616) defines Internet standards for HTTP (the application-level protocol for distributed, collaborative, and hypermedia information systems)*

## API design best practices

- Keep APIs simple and easy to use--simplified, friendly, and intuitive APIs always attract APP developers (clients for our API), get the best out of the APP developer, and make the APP developer's life more comfortable, less painful, and more productive.
- Expose well-defined and instantly recognizable business functions.
- Make APIs accessible with any standard web browsers--exposing APIs with existing web infrastructure (HTTPs `GET`, `POST`, `PUT`, and `DELETE`) and so accessible through a standard browser makes underlying APIs platform independent.
- Abstract service internals and domain models--the best APIs expose only URIs and payloads and not the service internals or domain models. An example is https://www.googleapis.com/books/v1/volumes.
- Ensures RESTful API payloads don't have any traces of SOAP payloads as the clients are not the same (machines versus humans).
- Be consistent--API implementations should be free from variation or contradiction; carry consistency across APIs by setting clear standards to help consumers with what to expect from the API, and implement similar behaviors such as searching and filtering (or pagination and limits) in the same way.
- Implement the standard URL pattern--an example of the standard URL pattern is `/collection/item/collection/item`, and the `/collection` can be books, dogs, events (plural), and so on.
- Exercise standard terminology--following standard and meaningful elements in the URI is critical for API success. An example of standard terminology would be `bookId, dogId`, and `eventId`, and not `bId`, `dId`, and `eId`.
- Be flexible--APIs are flexible to accept input from clients. An example would be `/planner/v1/tasks` or `/planner/v1/Tasks` or `/planner/v1/TASKS`; lowercase, uppercase, or camel case in the preceding example should be acceptable and should behave in the same way.
- Be stable--incremental modifications to the APIs are inevitable, but it should be independent of the client applications. In other words, no forced amendments to the clients who consume the APIs that undergo modifications. Say, `/books/v1/volumes` involves no changes to the clients and provide additional benefits/defect fixes when the volume module goes through some changes.
- There should be clear handle for errors and error messages--API implementations shouldn't just provide better business functions; it is critical that it handles the errors and error messages well to help clients with useful and human-readable error messages, including diagnostic information that can be understood by the app developer, as error messages give hints and assist the APP developers to resolve issues that may otherwise result in an error.
- Documentation--APIs are discoverable and documented, so publishing the API documentation is a must. API documentation includes a getting-started guide, sample codes, sample requests, sample responses, sample implementations, elaborate explanations about authentication and error handling, information about feedback avenues, and so forth.
- Provide feedback and support mechanism for API users.

## API design principles

Essential principles:

- Ubiquitous web standards
- API flexibility:
  - the data from the API should be independent of resources or methods.
- API standardization
- API optimization
- API granularity
- API sandbox or playground



## API granularity

- In general, consider services coarse-grained and APIs fine-grained.

Identify the vital business entities that the service impacts and model the life cycles accordingly; that is, there should be only one API operation for one business outcome.

## Optimized APIs

The API should be modeled after the design according to the use case it fulfills and not by the backend services or applications it exposes.

## Community standardization

**Open Travel Alliance (OTA)** and **Open Geospatial Consortium (OGC)** are two examples of open consortiums that help make our APIs much more usable and interoperable.

## API playgrounds

API providers should develop and expose an associated website/developer portal, for developers to quickly get on board with their APIs.

An interactive and in-browser API playground is one of the best ways for potential users to identify the API endpoints and test their code to experience the API behavior.

## RESTful API design rules

**The rules of APIs**:

- Use of Uniform Resource Identifiers
- URI authority
- Resource modelling
- Resource archetypes
- URI path
- URI query
- Metadata design rules (HTTP headers and returning error codes) and representations
- Client concerns (versioning, security, and hypermedia processing)

## Learning about Uniform Resource Identifiers

REST APIs should use **Uniform Resource Identifiers (URIs)** to represent their resources.

- A sample of a simple to understand URI is `https://xx.yy.zz/sevenwonders/tajmahal/india/agra`, as you may observe that the emphasized texts clearly indicates the intention or representation

## URI formats

- **Don't use a trailing forward slash**
- **Use hyphens (-)**
- **Avoid underscores**
- **Prefer all lowercase letters in a URI path**:
  - RFC 3986 defines URIs as case sensitive except for the scheme and host components
- **Do not include file extensions**

## API Resource models

Resource modelling is a crucial design aspect, and API designers need to think about the API resource model before they move on to designing URI paths.

## Resource archetypes

Resource modelling should start with a few fundamental resource archetypes, and usually, the REST API is composed of four unique archetypes, as follows:

- **Document**: the base for a resource representation with a field and link-based structure. Examples:
  - `https://api-test.lufthansa.com`
  - `https://api-test.lufthansa.com/v1/profiles`
  - `https://api-test.lufthansa.com/v1/profiles/customers`
- **Collection**: also a resource, and it is a directory of resources managed by the API providers or servers. Examples:
  - `https://api-test.lufthansa.com/v1/profiles/customers`
  - `https://api-test.lufthansa.com/v1/profiles/customers/accountbalance`
  - `https://api-test.lufthansa.com/v1/profiles/customers/memberstatus`
- **Stores**: a resource repository managed by the client. The store allows the API client to put resources in, choose URIs for the resources that get added, get them out, and delete them when it decides. Examples:
  - `http://api.example.com/cart-management/users/{id}/carts`
  - `http://api.example.com/song-management/users/{id}/playlists`
- **Controller**: these resources are similar to executable methods, with parameters and return values. These do not come under any of the CRUD methods. **Controller names should always appear as the last segment in a URI path, with no child resources to follow them in the hierarchy:
  - `POST /alerts/245245/resend` is an example of a controller resource that allows a client to resend an alert to a user.

## URI path

Rules for URI paths:

- Use singular nouns for document names
  - Example: `https://api-test.lufthansa.com/v1/profiles/customers/memberstatus`
- Use plural nouns for collections and stores:
  - Collections: `https://api-test.lufthansa.com/v1/profiles/customers`
  - Stores: `https://api-test.lufthansa.com/v1/profiles/customers/memberstatus/preferences`
- As controller names represent an action, use a verb or verb phrase for controller resources
  - Ex: `https://api-test.lufthansa.com/v1/profiles/customers/memberstatus/reset`
- Do not use CRUD function names in URIs:
  - Do: `DELETE /users/1234`
  - Don't: `DELETE /user-delete/1234`

## URI query


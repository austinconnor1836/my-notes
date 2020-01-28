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

URI query rules:

- Use the query to filter collections or stores:
  - An example of the limit in the query:
    - `https://api.lufthansa.com/v1/operations/flightstatus/arrivals/ZRH/2018-05-21T06:30?limit=40`
  - Use the query to paginate collection or store results:
    - An example with the offset in the query:
      - `https://api.lufthansa.com/v1/operations/flightstatus/arrivals/ZRH/2018-05-21T06:30?limit=40&offset=10`

## HTTP Interactions

## Request Methods

API Design rules:

- Don't tunnel to other requests with the `GET` and `POST` methods
- Use the `GET` method to retrieve a representation of a resource
- Use the `HEAD` method to retrieve response headers
- Use the `PUT` method to update and insert a stored resource
- Use the `PUT` method to update mutable resources
- Use the `POST` method to create a new resource in a collection
- Use the `POST` method for controller's execution
- Use the `DELETE` method to remove a resource from its parent
- Use the `OPTIONS` method to retrieve metadata

## Response status codes

Status code categories and some REST API rules:

- **1xx: Informational**: This provides protocol-level information
- **2xx: Success**: Client requests are accepted (successfully), as in the following examples:
  - `200`: OK
    - Use for indicating client request success
    - Do not use to communicate the errors in the response body
  - `201`: Created
    - Apply for successful resource creation
  - `202`: Accepted
    - Use for reporting the successful asynchronous action
  - `204`: No content
    - When an API wants to send empty or no content in the response body
- **3xx: Redirection**: Client requests are redirected by the server to the different endpoints to fulfil the client request:
  - `301`: Moved Permanently
    - Use for relocated resources
  - `302`: Found
    - Please note not to use `302`, as it would create confusion among the developers related to the initiation of automatic redirections from the client
  - `303`: See other
    - Apply to refer the client to a different URI (in place of `302`, it's recommended the API should use `303`)
  - `304`: Not modified
    - Use so that the client can preserve bandwidth
  - `307`: Temporarily redirect
    - Use to indicate to the clients to resubmit the request to another URI
- **4xx: Client error**: Errors at client side:
  - `400`: Bad request
    - Can be used to indicate generic or nonspecific failures
  - `401`: Unauthorized
    - Apply for unauthorized access from the client side or problem with the client credentials
  - `403`: Forbidden
    - Use to forbid access regardless of the authorization state
    - Use to enforce application-level permission (allowed to access only a few resources and not all the resources)
  - `404`: Not found
    - Must use when client request doesn't map to any of the API resources
  - `405`: Method not allowed
    - Use when the client accesses unintended HTTP methods
    - Example read-only resource might only support `GET` and `HEAD`, and the client tried to use `PUT` or `DELETE`
    - Please note that `405` response should be part of the Allow header (*Allow-`GET`. `POST`*)
  - `406`: Not acceptable
    - Must use when the server can't serve the requested media type
  - `409`: Conflict
    - Use for client violation of a resource state
    - An example could be an API returns this error when the client tries to delete a non-empty store resource
  - `412`: Precondition failed
    - Use to support conditional operations. The client sends on or more preconditions in the request headers to indicate to the API to execute only those conditions that are satisfied; if not, the API should send a `412` error code.
  - `415`: Unsupported media type
    - Must be used when the API is not able to process the request's payload media type (indicated in the content-type request header)
- **5xx: Server error**: These relate to errors at server side:
  - `500`: Internal server error
    - Use to report the API/server-side issues, and when it's certainly not the client's side fault

## Metadata design

## HTTP headers

Rules conforming to the HTTP standard headers:

- **Should use content-type**
  - clients and servers use this to indicate how to process the message's body
- **Should use content-length**
- **Should use last-modified in responses**
- **Should use ETag in responses: Entity tag (ETag)** is an HTTP header that helps the client to identify a specific version of the resources they asked for.
- **Stores must support conditional `PUT` requests**
  - `PUT` is the same as `POST` except `PUT` is *idempotent.
  - the calls the client makes produce the same results for all calls; that is multiple requests from the clients produce the same effect as a single request.
- **Should use the location specify the URI of newly created resources (through `PUT`)**
- **Should leverage HTTP cache headers**
- **Should use expiration headers with `200` ("OK") responses**
- **May use expiration caching headers with 3xx and 4xx responses**
  - APIs including caching headers for 3xx and 4xx responses are also known as negative caching. It helps the REST API server with a reduction in loads due to some redirection and error triggers.
- **Mustn't use custom HTTP headers**
  - only purpose is to provide additional information and troubleshooting tips for app developers

## Media types and media type design rules

Media types help to identify the form of the data in a request or response message body, and the content-type header value represents a media type also known as the **Multipurpose Internet Mail Extensions (MIME)** type.

Rules of media type design:

- **Uses application-specific media types**
- **Supports media type negotiations in case of multiple representations**

## Representations

Rules for the most common resource formats, such as JSON and hypermedia, and error types in brief:

## Message body format

- Use JSON for resource representation and it should be well-formed
- You may use XML and other formats as well
- Don't create additional envelopes or any custom transport wrappers and leverage only HTTP envelopes

## Hypermedia representation

REST API clients can programmatically navigate using a uniform link structure as a HATEOAS response.

Rules related to hypermedia representations:

- Use a consistent form to represent links, link relations, and link announcements
- Provide a self-linking representation in a response message body
- Minimize the number of the advertised *entry point* or API URIs
- Use links to advertise any resource actions in a state-sensitive manner

## Media type representation

For every client request, except for `GET` requests, the API should define the media type in the request body and response body.

API media type relates to features such as:

- sorting
- filtering
- paginating
- linking

## Errors representation

Error status codes of HTTP methods (4xx and 5xx) can carry client-readable information in the response body.

Rules:

- Errors and error responses should be consistent
- Error types for generic and for common error conditions should also be consistent

## Client concerns

As we mentioned before, REST API clients in the REST API world are APP developers and REST APIs are designed to suit the needs of their client programs (APP developer code).

A set of REST API design principles will be discussed to address common client concerns.

## Versioning

The representational resources of REST APIs communicate their state through the versions.

**Versioning is one of the essential design principles.**

APIs should be versioned (increase the major version) when it undergoes a breaking change, including:

- Response data changes
- Response type changes
- Removing any part of the API

Minor versions help to track the APIs' small changes and assist in customer support, who may be receiving cached versions of data or may be experiencing other API issues.

A few rules about REST API versioning:

- Use new URIs to introduce new models or conceptions
- Use schemas for managing representational form versions
- Make us of ETags to manage representational state versions

*The general versioning practices follow schematic versioning (https://semver.org/); however, the versioning practices in RESTful API attract lots of discussions, and please be aware that as API designers, we may need to make decisions aligned with business needs and impacts.*

## Security

Rules to help secure resources containing sensitive information:

- Use OAuth, an HTTP-based authorization protocol, to protect resources
- Use API management solutions, such as reverse proxy, to protect resources

## Response representation composition




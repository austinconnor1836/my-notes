# Chapter 6: RESTful Services API Testing and Security

- Enterprise-level software requires rigorous testing

Topics that will be covered:

- Types of API tests
- Challenges in API testing
- Security in API testing
- A glimpse at API testing tools, API security tools and frameworks

## An overview of software testing

Primary focus of any software product or application:

- **verification**: checks for consistency and alignment according to the documented requirements
- **validation**: checks the accuracy of the system and validates the end user's needs versus the actual outcome

## RESTful APIs and testing

### Basics of API testing

**API testing** and certification primarily focuses on data integration tests on the **Business layer**.

![business layer](./images/business-layer.png)

### API testing types

#### Unit tests

**Unit tests**: involve the validation of individual operations are unit tests.

#### API validation tests

All software needs quick evaluation and to assert its purpose of creation.

The validation tests need to be run for every function that is developed, at the end of the development process.

They are unlike unit tests as validation tests are a higher-level consideration.

They answer a set of questions so that the development can move on to the next phase.

Set of questions for validation tests:

1. A product-specific question, such as, is it the necessary function that is asked for?
2. A behavioral question, such as, is the developed function doing what is intended?
3. An efficiency-related question, such as, is the intended function using the necessary code, in an independent and optimized manner?

#### Functional tests

**Functional tests**: involve specific functions of the APIs and their code base.

Some examples:

- validating the count of active users through the API
- regression tests
- test case execution

#### UI or end-to-end tests

**End-to-end** tests: involve and assert end-to-end scenarios, including GUI functions and API functions, which in most of the cases, validate every transaction of an application.

#### Load testing

**Load tests**: ensure that an increase in the number of end users does not affect the performance of the functions of an application.

#### Runtime error detection tests

**Runtime error detection tests**: help monitor the application and detect problems such as race conditions, exceptions, and resource leaks.

#### Monitoring APIs

Tests for implementation errors, handler failures, and other inherent concerns inside the API and ensures it does not have any holes that would lead to application insecurity.

#### Execution errors

**Execution errors**: assert invalid requests for expected failures.

Example from Chapter 3:

![execution error 1](./images/execution-error-1.png)

- the end user gave an ID that is not present on the system.

#### Resource Leaks

**Resource leak tests**: validate the underlying API resource malfunctions by submitting invalid requests to the API. These resources include, in this case:

- memory
- data
- insecurities
- timeout operations
- etc.

#### Error detection

Detect network communication failures, like authentication failures from the wrong credentials.

Chapter 4 example of this:

![error detection](./images/error-detection.png)

- authentication error that returns a code of `401`, as it should

### REST API security vulnerabilities

Some potential API security vulnerability examples:

- man-in-the-middle-attacks (MITM)
- lack of XML encryptions
- insecure endpoints
- API URL parameters

We will present the most common API attacks and vulnerabilities in the following sections.

### Exposing sensitive data

**The first and foremost essential secuirty aspect of testing a REST API (or any appilcation)**: evaluate and determine the categories of data and teh need for data protection when they are in transit or in a persisted state.

Examples:

- personal information
- credit card information
- health records
- financial information
- business information
- many other categories...

Data is fundamentally protected through encryption, as without it, hackers could easily obtain the sensitive information.

Some protection measures:

- Do not store sensitive information unless necessary. Use tokenization and truncation methods to prevent the exposure of sensitive data.
- Encryption is necessary and essential
- Do not implement a cache for sensitive information (or disable caches for sensitive data transactions)
- Use salts and adaptive (with a configurable number of iterations) hashing methodologies for passwords.

### Understanding authentication and authentication attacks

Authentication: a process to determine the identity of an entity (a process, a machine, or a human user) to either disallow or allow that entity to access underlying application functionalities.

### Understanding authorization and OAuth2 schemes

**OAuth IETF OAuth Working Group**: https://tools.ietf.org/wg/oauth/

Why OAuth is better than traditional cookie-based authorization:

- server has to maintain session state for cookie-based, other things also make it difficult to decouple state from the server
- cookie-based involve domains, as application may interact with multiple domains, so additional security overhead
- OAuth has capability of integration with Google and Facebook while cookie-based does not
- cookie-based is considered a maintenance nightmare, especially when relying on mobile-based authentication

OAuth allows arbitrary clients (for example, first-party iOS application or a third-party web application) to access user's (resource owner's) resources on resource servers via authorization servers with secure, reliable, and effective methods:

![oauth resource](./images/oauth-resource.png)

- OAuth authorization stakeholders and their roles picture here

| Schemes/Flow                        | Client type                                                  | Brief description                                            |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Implicit                            | **Single-page application (SPA)** such as Google Fonts.      | Application requests access tokens from the gateway and the user grants permission. |
| Client-credentials                  | Machine-to-machine non-interactive programs such as services, daemons, and so on | The application passes the client credentials and gets the access token from the gateway server. |
| Authorization code                  | Less trusted apps (third-party apps requesting access to your application) | The application sends a temporary authorization code it receives from the gateway and gets it validated (by the same gateway) |
| Resource owner password credentials | Highly trusted apps (first-party apps)                       | The client will ask the user for their authorization credentials (usually a username and password), then the client sends a few parameters (`grant_type`, `client_id`, `client_secret`) to the authorization server. |

Typical sequence of a resource owner password credential OAuth scheme:

![resource owner](./images/resource-owner.png)

Code on GitHub: `Chapter06/oauth2-sample`

1. Run `mvn clean install`
2. Run application: `java -jar target/oauth2-sample-0.0.1-SNAPSHOT.jar`
3. Open Postman and test URLs (in `Chapter06` folder of Postman collections).

## Cross-site scripting

**Cross-site scripting attack (XSS)**: the process of injecting malicious code as part of the input to web services, usually through a browser.

Once injected, the malicious script can access any:

- cookies,
- session tokens
- sensitive information by the browser
- can masquerade as the content of the rendered pages

Two categories: **client-side XSS** and **server-side XSS**

XSS is traditionally one of three types:

- Reflected XSS
- Stored XSS
- DOM XSS

### Reflected XSS

**Reflected XSS**: happens when an application allows an attacker to inject browser-executable code (such as JavaScript, Applets, Action Scripts, Flash) within a single HTTP response.

### Stored XSS

**Stored XSS** (also known as **persistent XSS**): often considered harmful and high risk, occurs when a malicious script is injected into a vulnerable application as input and is viewed by another user or an administrator at a later time.

### DOM XSS

**DOM XSS**: developed by Amit Klein and available since 2005, occurs when client-side code uses insecure references to DOM objects that are not entirely controlled by server-provided pages.

- Single-page applications are vulnerable to DOM XSS
- Generally, but not limited to, APIs that dynamically inject attacker-controllable data to a page and JavaScript frameworks.

*XSS protection needs to filter malicious content from user input and also needs encoding (escape).*

## Cross-site request forgery

**Cross-site request forgery (CSRF)**: Sea Surf, or XSRF, as it's known, is a one-click attack vulnerability that web applications exposes the possibility of the end user being forced (by forged links, emails, and HTML pages) to execute unwanted actions on a currently authenticated session.

*The synchronize token pattern, cookie-to-header token, double submit cookie, and client-side safequards are common CSRF prevention methodologies.*

## Denial-of-service attack


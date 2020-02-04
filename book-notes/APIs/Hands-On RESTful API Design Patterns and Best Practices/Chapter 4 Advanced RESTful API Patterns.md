# Chapter 4: Advanced RESTful API Patterns

Patterns that will be discussed in this chapter:

- Versioning
- Authorization
- Uniform contract
- Entity endpoint
- Endpoint redirection
- Idempotent
- Bulk operations
- Circuit breaker
- API facade
- Backend for frontend

## Versioning

Ideally, we'd never change or API URIs, much like we would never change our website URLs.

General rules for versioning:

- new major version when the new implementation breaks the existing customer implementations
- minor versions when the new implementation does not break existing customer implementations, but it does fix bugs and provides enhancements

### 4 Ways of handling Versioning

#### Versioning through the URI path

From: `http://localhost:9090/v1/investors`

To: `http://localhost:9090/v2/investors`

Example code:

```java
// URI path version implementation
	@GetMapping({ "/v1/investors", "/v1.1/investors", "/v2/investors" })
	public List<Investor> fetchAllInvestors() {
		return investorService.fetchAllInvestors();
	}
```

Produces:

![ch4 versioning](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/ch4-versioning.png)

- usually, changing URI paths violates the RESTful principles of URI and its resource representation--the only difference is `v1`, `v2`, and so on, in our example).
- However, this is a popular way of managing API versions due to its simple implementation.

### Versioning through query parameters

Examples:

- `http://localhost:9090/investors?version=1`
- `http://localhost:9090/investors?version=2.1.0`

```java
// sample implementation of version as parameters
	@GetMapping("/investors")
	public List<Investor> fetchAllInvestorsForGivenVersionAsParameter(@RequestParam("version") String version)
			throws VersionNotSupportedException {
		return getResultsAccordingToVersion(version);
	}
```

![ch4 versioning params](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/ch4-versioning-params.png)

### Versioning through custom headers

Define a new header that contains the version number in the request as part of the request header itself.

**A custom header allows the client to maintain the same URIs, regardless of any version upgrades.**

- this uses content-negotiation

```java
// sample implementation of version as accept header x-resource-version
	@GetMapping("/investorsbycustomheaderversion")
	public List<Investor> fetchAllInvestorsForGivenVersionAsCustomHeader(
			@RequestHeader("x-resource-version") String version) throws VersionNotSupportedException {
		return getResultsAccordingToVersion(version);
	}
```

![versioning custom header](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/versioning-customheader.png)

Produces:

![custom header output](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/customheader-output.png)

If no header is included, it will response with an error: `400: Bad Request`

### Versioning through content-negotiation

**This is the preferred way** through the Accept (request) header and the content-type (media) in response.

```java
// sample implementation of version as accept header
	@GetMapping(value = "/investorsbyacceptheader", headers = "Accept=application/investors-v1+json, application/investors-v1.1+json")
	public List<Investor> fetchAllInvestorsForGivenVersionAsAcceptHeader() throws VersionNotSupportedException {
		return getResultsAccordingToVersion("1.1");
	}
```

![versioning content negotiation](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/versioning-content-negotiation.png)

![versioning content negotiation output](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/versioning-content-negotiation-output.png)

### Authorization

Scheme: **basic authentication**

Other schemes: **hash-based message authentication (HMAC), JSON Web Token (JWT)**, and OAuth 2.0 bearer authentication token scheme.

Basic authentication is a standard HTTP header (RESTful API constraint compliant) with the user's credentials encoded in Base64.

The credentials, username and password, are encoded in the format username-password.

They are **encoded**, not **encrypted.**

- it is vulnerable to some security attacks
- the rest API using basic authentication will have to communicate over SSL

Authentication vs. Authorization:

- authentication: verifies who (user) is accessing the APIs
- authorization: whether the accessing user has privileges or is authorized to access the API resources.

#### Authorization with the default key

With Spring, we only need add to `pom.xml`:

```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

Header for Basic Authentication in `GET` request:

`Basic <ENCODED_USERNAME-PASSWORD>`

so for:

username: `user`

password: `a068dcaf-066c-4058-a73d-81dea31100e7`

produces:

`Basic dXNlcjphMDY4ZGNhZi0wNjZjLTQwNTgtYTczZC04MWRlYTMxMTAwZTc=`

#### Authorization with credentials

Custom credentials comes with Spring out-of-the-box

In `PatronAuthConfig.java`:

```java
package com.books.chapters.restfulapi.patterns.chap4.springboot.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class PatronsAuthConfig extends WebSecurityConfigurerAdapter {

	private static final String NO_RESTRICT_WELCOME_URI = "/welcome";
	private static final String DEFAULT_ADMIN_SECRET = "admSecret";
	private static final String DEFAULT_ADMIN_ID = "admin";
	private static final String DEFAULT_USER_ROLE = "USER";
	private static final String DEFAULT_ADMIN_ROLE = "ADMIN";
	private static final String DEFAULT_USER_SECRET = "usrSecret";
	private static final String DEFAULT_USER_ID = "user";

	@Override
	protected void configure(AuthenticationManagerBuilder authMgrBldr) throws Exception {
		authMgrBldr.inMemoryAuthentication()
				.passwordEncoder(org.springframework.security.crypto.password.NoOpPasswordEncoder.getInstance())
				.withUser(DEFAULT_USER_ID).password(DEFAULT_USER_SECRET).authorities(DEFAULT_USER_ROLE).and()
				.withUser(DEFAULT_ADMIN_ID).password(DEFAULT_ADMIN_SECRET)
				.authorities(DEFAULT_USER_ROLE, DEFAULT_ADMIN_ROLE);
	}

	// for any URL applying the security (basic authentication)
	@Override
	protected void configure(HttpSecurity httpSec) throws Exception {
		// force for credentials every time (stateless)
		
        
 // the magic of forcing authorization headers to validate for credentials
 // in each request
       httpSec.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		// Invalid CSRF Token 'null' was found on the request parameter '_csrf'
		// or header 'X-CSRF-TOKEN'
		httpSec.csrf().disable();

		// welcome page no authentication required
		// /investors/admin only admin should be able to access
		// other pages Users should also be able to access
        httpSec
        .csrf().disable()
        .authorizeRequests()
        .and()
        .authorizeRequests()
        .antMatchers(NO_RESTRICT_WELCOME_URI).permitAll()
        .antMatchers("/investors/admin").hasAuthority(DEFAULT_ADMIN_ROLE)
        .antMatchers("/investors/invr*/**").access("hasAuthority('"+DEFAULT_USER_ROLE+"')")
        .anyRequest().authenticated()
        .and()
        .httpBasic()
        .and()
        .logout();
	}

}
```



Usernames and passwords used in example:

| User Id | Password    | Role    |
| ------- | ----------- | ------- |
| `admin` | `admSecret` | `ADMIN` |
| `user`  | `usrSecret` | `USER`  |

*I could not get the example code to work properly*

### Uniform contract

The consumer can now consume the latest version of our services without the need to keep changing their implementation or REST API endpoints.

The service consumer needs to be aware of the latest and evolving details of those service contracts.

This is where the uniform contract pattern comes in.

It does the following:

- standardize the service contract and make it uniform across any service endpoints
- Abstract the service endpoints from individual services capabilities
- Follow the REST principles where the endpoints use only HTTP verbs, and express the underlying resources executable actions only with HTTP verbs

Example was implemented in previous section.

### Entity endpoints

Entity endpoints suggest exposing each entity as individual lightweight endpoints of the service they reside in, so the service consumers get the global addressability of service entities:

![entity endpoint diagram](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/entity-endpoint-diagram.png)

- the entity endpoints expose reusable enterprise resources, so service consumers can reuse and share the entity resources.
- examples would be for `/investors/investorId`, and `investor/stockId`

### Endpoint redirection

If the service endpoint needs to change, which isn't ideal, the service client knows about it using standard HTTP return codes, `3xx`, and with the **Location** header, then by receiving `301 Moved permanently` or `307 Temporary Redirect`.

![endpoint redirection diagram](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/endpoint-redirection-diagram.png)

- the service consumers may call the new endpoints that are found in the **Location** header.

### Idempotent

**Idempotent** is one of the fundamental resilience and scalable patterns, as it decouples the service implementation nodes across distributed systems.

This is the solution to a service implementation producing the same results when handling messages/data, even after multiple calls.

Refer to Chapter 3 for examples of idempotent implementations of `DELETE`, `PUT`, and `PATCH` (`DELETE` only deletes the resource once, even if it is called multiple times).

To handle concurrency, the services can be enhanced with E-Tag and send back a `409` conflict response to inform the client that the resource called is in an inconsistent state.

### Bulk operation

Marking a list of emails as read in our email client could be an example of a bulk operation; the customer chooses more than one email to tag as `Read`, and one REST API call does the job instead of multiple calls to an underlying API.

Two approaches to implementing bulk operations:

- Content-based bulk operation
- Custom-header action-identifier-based bulk operation

```java
// bulk (patch) operation example with custom request header

	@PatchMapping("/investors/{investorId}/stocks")
	public ResponseEntity<Void> updateStockOfTheInvestorPortfolio(@PathVariable String investorId,
			@RequestHeader(value = "x-bulk-patch") Optional<Boolean> isBulkPatch,
			@RequestBody List<Stock> stocksTobeUpdated) throws CustomHeaderNotFoundException {
		// without custom header we are not going to process this bulk operation
		if (!isBulkPatch.isPresent()) {
			throw new CustomHeaderNotFoundException("x-bulk-patch not found in your headers");
		}
		investorService.bulkUpdateOfStocksByInvestorId(investorId, stocksTobeUpdated);
		return ResponseEntity.noContent().build();
	}
```

### Circuit breaker

The circuit breaker is an automatic switch designed to protect entire electrical circuits from damage due to excess current load as a result of a short circuit or overload.

The same concept applies when services interact with many other services.

This pattern helps subsystems to fail gracefully and also prevents complete system failure as a result of a subsystem failures:

![circuit breaker diagram](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/circuit-breaker-diagram.png)

Three different states that constitute the circuit breaker:

- **Closed**:
  - all service interconnections are intact and all the calls go through intended services.
  - needs to keep track of failures to determine threshold limits
    - move to the open state if the number of failures exceeds threshold limits to avoid cascading impacts
- **Open**:
  - returns errors without really executing their intended functions
- **Half-open**:
  - services are periodically (timeout) checked for failures that made the services be in the open state.
  - services reside in the open state if they do not stop failing
  - this state is responsible for triggering a service that is no longer failing back to the closed state for the continuous function

**Hysterix**: incredibly dominant open source library for Java

In the `circuit-breaker-service`, in `InvestorService.java`:

```java
@HystrixCommand(fallbackMethod="welcomeUrlFailureFallback")
	public String circuitBreakerImplWelcome() {
		logger.info("reached circuit breaker consumer circuit breaker impl");
		RestTemplate restTemplate = new RestTemplate();
		URI circuitBreakerServiceURI = URI.create(CIRCUIT_BREAKER_SERVICE_URL);
		return restTemplate.getForObject(circuitBreakerServiceURI, String.class);
	}
	
	// fall back method for welcome page failures
	public String welcomeUrlFailureFallback(){
		logger.info("lucky we have a fallback method");
		return WELCOME_URI_FALLBACK_MESG;
	}
```



![circuit breaker](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/circuit-breaker.png)

*The downside of the circuit-breaker pattern is that the applications/services involved may experience slight performance hits. However, it's a good trade-off for many real-world applications.*

### Combining the circuit pattern and the retry pattern

The **retry patterns** enable the application to retry failed operations, expecting those operations to become operational and eventually succeed.

However, it may result in a **denial of service (DoS)** attack within our application.

We want an intelligent retry mechanism that's sensitive to any failures returned by the circuit breaker that indicates no transient failures, and so the application abandons any further retry attempts.

#### API facade

From GoF, the **facade** pattern abstracts the complex subsystem from the callers and exposes only necessary details as **interfaces** to the end user.

![api facade](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/api-facade.png)

- for when the client needs to make multiple service calls
- the facade can be implemented with a single API endpoint
- high scalability and high performance

In our example, the delete operations implement a simple API facade.

They call the *design for intent* method that is abstract to the caller by introducing a simple interface to our investor services.

In `Chapter04/investor-services-facade/src/**/service/DeleteServiceFacade.java`:

```java
package com.books.chapters.restfulapi.patterns.chap4.springboot.service;

import java.util.List;

public interface DeleteServiceFacade {
	boolean deleteAStock(String investorId, String stockTobeDeletedSymbol);
	boolean deleteStocksInBulk(String investorId, List<String> stocksSymbolsList);
}
```

In `**/service/DeleteServiceFacadeImpl.java`:

```java
package com.books.chapters.restfulapi.patterns.chap4.springboot.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.books.chapters.restfulapi.patterns.chap4.springboot.models.IndividualInvestorPortfolio;
import com.books.chapters.restfulapi.patterns.chap4.springboot.models.Investor;
import com.books.chapters.restfulapi.patterns.chap4.springboot.models.Stock;

@Component
public class DeleteServiceFacadeImpl implements DeleteServiceFacade {

	private static final Logger logger = LoggerFactory.getLogger(InvestorService.class);
	private InvestorServicesFetchOperations investorServicesFetchOperations = new InvestorServicesFetchOperations();

	@Override
	public boolean deleteAStock(String investorId, String stockTobeDeletedSymbol) {
		boolean deletedStatus = false;

		Stock stockTobeDeleted = investorServicesFetchOperations.fetchSingleStockByInvestorIdAndStockSymbol(investorId,
				stockTobeDeletedSymbol);
		if (stockTobeDeleted != null) {
			Investor investor = investorServicesFetchOperations.fetchInvestorById(investorId);
			deletedStatus = investor.getStocks().remove(stockTobeDeleted);
		}
		designForIntentCascadePortfolioDelete(investorId, deletedStatus);
		return deletedStatus;
	}

	@Override
	public boolean deleteStocksInBulk(String investorId, List<String> stocksSymbolsList) {
		return false;
	}

	private void designForIntentCascadePortfolioDelete(String investorId, boolean deletedStatus) {
		IndividualInvestorPortfolio individualInvestorPortfolio = InvestorService.portfoliosMap
				.get(investorServicesFetchOperations.fetchInvestorById(investorId).getId());
		if (deletedStatus) {
			individualInvestorPortfolio.setStocksHoldCount(individualInvestorPortfolio.getStocksHoldCount() - 1);
			logger.info("updated the portfolio for Delete stocks operation");
		} else {
			logger.warn("Update to the individual portofolio not pursued as deleted status of DEL operation returned ");
		}
	}

}
```

### Backend for frontend

**Backend for frontend (BFF)** is a pattern that helps to bridge any API design gaps.

- it suggests introducing a layer between the user experience and the resources it calls.

Requirements to help understand why we need multiple interfaces for the same backend services:

- Response payload formatting and size may differ for each client
- Performance bottlenecks and optimization requirements due to the number of calls to be made to services
- When in need of shared or general purpose backend services, but with less development and maintenance overhead

BFF is not always the best solution and has many costs as well as benefits.

### Summary

- versioning APIs
- securing APIs with authorization
- enabling service clients with:
  - uniform contract
  - entity endpoint
  - endpoint redirections
- Idempotency, powering bulk API operations
- **Most importantly**, we learned of the circuit-breaker implementation with *Hysterix*, where we envisioned and implemented the resiliency patters of API designs.
- Concluded with the BFF (Backend for frontend) pattern
  - reduces churns within the cross-implementation team by helping them to develop an exclusive interface for target environments

### Further reading

- RESTful Java Patterns and Best Practices: `https://www.packtpub.com/application-development/restful-java-patterns-and-best-practices`


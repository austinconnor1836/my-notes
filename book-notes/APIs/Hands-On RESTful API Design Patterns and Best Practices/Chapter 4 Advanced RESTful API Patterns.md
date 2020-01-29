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
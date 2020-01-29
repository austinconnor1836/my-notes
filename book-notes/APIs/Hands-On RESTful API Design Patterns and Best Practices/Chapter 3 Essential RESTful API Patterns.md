# Chapter 3: Essential RESTful API Patterns

These design patterns will be written in Java 1.8 and implemented with Spring Boot.

To run the code in this chapter, you need **Java 8, Spring 4 (1.4.4)**, and **Maven 3.x**.

## Beginning with RESTful API patterns - part 1

Design patterns that will be discussed:

- Statelessness
- Content negotiation
- URI templates
- Design for intent
- Pagination
- Discoverability
- Error and exception logging
- Unicode

### Statelessness

**Statelessness**: the states that are stored at the server side and help to identify the client's requests, client's last interaction details, and their current context information.

We do not want to store state information at the application server side.

Session states should entirely be managed and kept at the client side.

The server does not store the client state and doesn't rely on its stored context.

To comply with RESTful constraints, and for the service to be genuinely stateless, the servers don't even store the authentication/authorization information of the client and make clients provide credentials with their request.

### Content negotiation

The resources in the RESTful APIs need to deal with different type of representations--not just XML or **JavaScript Object Notation (JSON)**, as different clients may need different representations.

As we build complex APIs, we may find that XML/JSON is too limiting, and we may need to move to another type of content in an entirely different format (Instagram and Flickr use JPEG and PNG images, while media houses use MP3/MP4), and that's how we get to content negotiation.

For content negotiation, REST services need to use HTTP headers; that is, when the client makes requests, it includes the accepts header, the list of file types that the client and server can handle with no additional steps to the client requests, the server processes, and replies.

For most practical purposes, server-side negotiations are more complex and lead to make many assumptions about client requirements.

So, most of the REST API implementations follow agent-driven content negotiations that rely on the HTTP request headers or resource URI patterns.

Example using `http://www.w3.org/StyleSheets/TR/logo-REC`:

![content negotiation](/home/aconnor/repos/my-notes/book-notes/APIs/Hands-On RESTful API Design Patterns and Best Practices/images/content-negotiation.png)

- observe logo-REC is an image file, but it does not have any file extension
- observe the **content-location** and the **content-type** headers are `image/png`.

#### Content negotiation with HTTP headers

If no Accept header is present in the request, the server will send a pre-configured default representation type.

```java
@GetMapping(path = "/investors/{investorId}/stocks/{symbol}", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	public Stock fetchAStockByInvestorIdAndStockId(@PathVariable String investorId, @PathVariable String symbol) {
		return investorService.fetchSingleStockByInvestorIdAndStockSymbol(investorId, symbol);
	}
```

- this line: `produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }` allows the client to send an `Accept` or `Content-Type` header in either XML or JSON format.

### URI templates

Server-side developers require the ability to describe the layout of the URIs that their services will respond to.

The answer to this is **URI templates**:

- they provide a way to describe a **set of resources as variables**.

| Resources                                                    | URI templates                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| People: `https://swapi.co/api/people/`<br />Planets: `https://swapi.co/api/planets/`<br />Films: `https://swapi.co/api/films`<br />Species: `https://swapi.co/api/species/` | `https://swapi.co/api/{resource_id}`                         |
| `https://swapi.co/api/films/2/`<br />`https:/swapi.co/api/films/6/` | `https://swapi.co/api/{resource_id1}`<br />`/{resource_id2}` |

- to use variables, we need to provide those variables within curly braces

- the code example from above includes the `@PathVariable` classification to help

### Design for intent

Design for intent is a term that's used in structural and automobile fields for parameterized changes, and we will learn how it benefits REST API services as well.

Design for intent is a method that expresses the different relationships between objects so that changes to one object automatically propagates changes to others.

In Tesla's case, the decreased number of charging cycles (cascading effect) helped to avoid overheating of the engine.

A proper RESTful API should not expose the internal business objects.

Design for intent is a strategic design pattern that's intended to influence or result in specific and additional user behaviors.

Choosing the right granularity of APIs plays a vital role in the design for intent strategy.

An example of this would be adding a new stock to an investor's portfolio.

### Pagination

**Pagination** is a concept that helps in serving only part of the data as a response, however, with information about how to access all the data from the server, page by page, without much load and high computation for the server to serve the whole data.

We will consider the page as a representation and not as a resource.

Pagination as part of the URI path is not an option (as we consider that it is not a resource but resource representation), that is, `xxx.api.com/stocks/page/2`, as we may not be able to uniquely find the resource between calls.

Three variants of resource representation ways pagination:

- **Offset-based**: when a client needs responses based on page count and page number. For example, `GET /investor/{id}/stocks?offset=2&limit=5 (returns stocks 2 through 7)`.

- **Time-based**: When a client needs responses between a specified timeframe and can have a limit as well as part of the parameter to represent the max number of results per page. For example, `GET /investor/{id}/stocks?since=xxxxxx&until=yyyyyy (returns stocks between a given dates)`.

- **Cursor-based**: A technique where a pointer (a built-in bookmark with breadcrumbs) reference of the remaining data is served a specific subset of data as a response and is let off. However, the rest of the data is still needed for later requests until the cursor reaches the end of the records. For example, `GET slack.com/api/users.list?limit=2&token=xoxp-1234-5678-90123`. Example code:

  - ```java
    @PostMapping("/investors/{investorId}/stocks")
    	public ResponseEntity<Void> addNewStockToTheInvestorPortfolio(@PathVariable String investorId,
    			@RequestBody Stock newStock) {
    		Stock insertedStock = investorService.addNewStockToTheInvestorPortfolio(investorId, newStock);
    		if (insertedStock == null) {
    			return ResponseEntity.noContent().build();
    		}
    
    		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path(ID)
    				.buildAndExpand(insertedStock.getSymbol()).toUri();
    		return ResponseEntity.created(location).build();
    	}
    ```

### Discoverability

Discoverability of the API is all about the descriptive capability of the server to instruct the client on the usage of the API.

1. **By valid HTTP methods**: When clients call REST services with invalid HTTP methods, the response of that request should end up in the `405` HTTP error code; that is, `405 Method Not Allowed`. Example code:

   ```java
   @DeleteMapping("/investors/{investorId}/stocks/{symbol}")
   	public ResponseEntity<Void> deleteAStockFromTheInvestorPortfolio(@PathVariable String investorId,
   			@PathVariable String symbol) {
   		if (investorService.deleteStockFromTheInvestorPortfolio(investorId, symbol)) {
   			return ResponseEntity.noContent().build();
   		}
   		return ResponseEntity.ok(null);
   	}
   ```

2. **By providing the URI of the newly created resource**

### Error and exception logging

Services are the black boxes to the API developers, and therefore service providing errors and exceptions provide clients with a clear context and visibility to use our APIs.

We can utilize existing HTTP standard error codes as well as provide more customized errors and messages to the caller.

### Unicode

A simple yet powerful way to make our API support multiple languages is to enable the API to support Unicode.

**Unicode** is an encoding standard that support an international character set.

- has a unique number for every character across multiple languages including Chinese, Korean, and Arabic and their scripts.

We can include Unicode support in our REST API headers:

```java
@GetMapping(value="/investors/welcome", produces="text/plain;charset=UTF-8") public String responseProducesConditionCharset() { return " (\"Welcome Investor!\" in Japanese)"; }
```


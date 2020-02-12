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


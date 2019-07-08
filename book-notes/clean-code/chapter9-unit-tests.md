# Chapter 9: Unit Tests

## The Three Laws of TDD

By now everyone knows that TDD asks us to write unit tests first, before we write production code. But that is just the tip of the iceberg. Consider the following three laws:

- **First Law**: You may not write production code until you have written a failing unit test.
- **Second Law**: You may not write more of a unit test than is sufficient to fail, and not compiling is failing.
- **Third Law**: You may not write more production code than is sufficient to pass the currently failing test.

The tests and the production code are written together, with the tests just a few seconds ahead of the production code.If we work this way, those tests will cover virtually all of our production code.

Having dirty tests is equivalent to, if not worse than, having no tests.

The problem is that tests must change as the production code evolves.

As you modify the production code, old tests start to fail, and the mess in the test code makes it hard to get those tests to pass again.

Without a test suite they lost the ability to make sure that changes to their code base worked as expected. Without a test suite they could not ensure that changes to one part of their system did not break other parts of their system.

The moral of the story is simple: **_test code is just as important as production code_**.

### Tests Enable the -ilities

It is the *unit tests* that keep our code flexible, maintainable, and reusable.

The reason is simple: if you have tests, you do not fear making changes to the code.

Without tests every change is a possible bug.

Tests enable **_change_**.

### Clean Tests

Three things make a clean test:

1. Readability
2. Readability
3. Readability

Follow the BUILD-OPERATE-CHECK pattern for unit tests. A good example:

```java
public void testGetDataAsXml() throws Exception {
    makePageWithContent("TestPageOne", "test page");
    
    submitRequest("TestPageOne", "type:data");
    
    assertResponseIsXML();
    assertResponseContains("test page", "<Test");
}
```

### Domain-Specific Testing Language


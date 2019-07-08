# Chapter 9: Unit Tests

Example of a Bad Test:
```java
@Test
public void turnOnLoTempAlarmAtThreshold() throws Exception {
    hw.setTemp(WAY_TOO_COLD);
    controller.tic();
    assertTrue(hw.heaterState());
    assertTrue(hw.blowerState());
    assertFalse(hw.coolerState());
    assertFalse(hw.hiTempAlarm());
    assertTrue(hw.loTempAlarm());
}
```
This does not read well as you have to move your eyes back and forth between the name of the state being checked, and the *sense* of the state being checked.

This greatly improves the readability of the previous test:
```java
@Test
public void turnOnLoTempAlarmAtThreshold() throws Exception {
    wayTooCold();
    assertEquals("HBchL", hw.getState());
}
```
This does hide the detail of the `tic` function. Upper case means "on", lower case means "off," and the letters are always in the following order: `{heater, blower, cooler, hi-temp-alarm, lo-temp-alarm}`.

This greatly improves the ease of reading tests.

There are things that you might never do in a production environment that are perfectly fine in a test environment. Usually they involve issues of memory or CPU efficiency. But they *never* involve issues of cleanliness.

### One Assert per Test
There is a school of thought that says that every test function in a JUnit test should have one and only one assert statement. 
```java
public void testGetPageHierarchyAsXml() throws Exception {
    givenPages("PageOne", "PageOne.ChildOne", "PageTwo");

    whenRequestIsIssued("root", "type:pages");

    thenResponseShouldBeXML();
}

public void testGetPageHierarchyHasRightTags() throws Exception {
    givenPages("PageOne", "PageOne.ChildOne", "PageTwo");

    whenRequestIsIssued("root", "type:pages");

    thenResponseShouldContain(
        "<name>PageOne</name>", "<name>PageTwo</name>", "<name>ChildOne</name>"
    );
}
```
Also note the `given-when-then` convention. This makes the tests even easier to read. This could lead to a lot of duplicate code though.

You do not have to follow the one assert per test rule strictly. The best thing we can say is that the number of asserts in a test ought to be minimized.

### Single Concept per Test
A better rule could be that we want a single concept in each test function.
Do not want long test functions that test one miscellaneous thing after another.

### F.I.R.S.T.
**Fast**  
**Independent**: tests should not set up conditions for following tests.  
**Repeatable**: tests should be repeatable in **any environment**. You should be able to run the tests in the production environment, in the QA environment, and on your laptop while riding home on the train without a network.  
**Self-Validating**: the tests should have a boolean output. Either they pass or fail. You should not have to read through a log file to tell whether the tests pass. If the tests aren't self-validating, then failure can become subjective and running the tests can require a long manual evaluation.  
**Timely**: tests need to be written in a timely fashion. Unit tests should be written *just before* the production code that makes them pass. If you write tests after the production code, then you may find the production code to be hard to test.

### Conclusion
Tests are just as important to the health of the project as the production code is. Perhaps they are even more important, because tests preserve and enhance the flexibility, maintainability, and reusability of the production code. So keep your tests constantly clean. Work to make them expressive and succinct. Invent testing APIs that act as domain-specific language that helps you write the tests.  
If you let the tests rot, then your code will rot too. Keep your tests clean.

## Chapter 10: Classes
### Class Organization
Following the standard Java convention, a class should begin with a list of variables. Public static constants, if any, should come first. Then private static variables, followed by private instance variables. There is seldom a good reason to have a public variable.

### Classes Should Be Small!
The first rule of classes is that they should be small. The second rule of classes is that they should be smaller than that.

We measure the size of classes not by the number of lines, but by *responsibilities*.

The name of a class should describe what responsibilities a class fulfills.

### The Single Responsibility Principle
The Single Responsibility Principle states that a class or module should have one and only one, *reason to change*.

Classes should have one responsibility - one reason to change.

An example of a single responsibility class:
```java
public class Version {
    public int getMajorVersionNumber();
    public int getMinorVersionNumber();
    public int getBuildNumber();
}
```

Do you want your tools organized into toolboxes with many small drawers each containing well-defined and well-labeled components? Or do you want a few drawers that you just toss everything into?

### Cohesion
Classes should have a small number of instance variables. 

Each of the methods of a class should manipulate one or more of those variables.

In general the more variables a method manipulates the more cohesive that method is to its class.

A class in which each variable is used by each method is maximally cohesive.

In general it is neither advisable nor possible to create such maximally cohesive classes; on the other hand, we would like cohesion to be high.

**When cohesion is high, it means that the methods and variables of the class are co-dependent and hang together as a logical whole**.

A cohesive class example:
```java
public class Stack {
    private int topOfStack = 0;
    List<Integer> elements = new LinkedList<Integer>();

    public int size() {
        return topOfStack;
    }

    public void push(int element) {
        topOfStack++;
        elements.add(element);
    }

    public int pop() throws PoppedWhenEmpty {
        if (topOfStack == 0) {
            throw new PoppedWhenEmpty();
        }
        int element = elements.get(--topOfStack);
        elements.remove(topOfStack);
        return element;
    }
}
```

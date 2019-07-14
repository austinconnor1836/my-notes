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
#### Maintaining Cohesion Results in Many Small Classes
If a function is large with many variables, split it up into smaller functions and classes with instance variables to be used by many of the created and smaller functions.

#### Organizing for Change
As soon as we find ourselves opening up a class, we should consider fixing our design.
A solution:
```java
abstract public class Sql {
    public Sql(String table, Column[] columns);
    abstract public String generate();
}

public class CreateSql extends Sql {
    public CreateSql (String table, Column[] columns);
    @Override public String generate();
}

public class SelectSql extends Sql {
    public SelectSql (String table, Column[] columns);
    @Override public String generate();
}

public class InsertSql extends Sql {
    public InsertSql(String table, Column[] columns, Object[], fields);
    @Override public String generate();
    private String valuesList(Object[] fields, final Column[] columns);
}

public class SelectWithCriteriaSql extends Sql {
    public SelectWithCriteriaSql(
        String table, Column[] columns, Criteria criteria)
        @Override public String generate()
    )
}

public class SelectWithMatchSql extends Sql {
    public SelectWithMatchSql(
        String table, Column[] columns, Column column, String pattern)
        @Override public String generate()
}

public class FindByKeySql extends Sql {
    public FindByKeySql(
        String table, Column[] columns, String keyColumn, String keyValue)
    @Override public String generate()
}

public class PreparedInsertSql extends Sql {
    public PreparedInsertSql(String table, Column[] columns)
    @Override public String generate() {
        private String placeholderList(Column[] columns)
    }
}

public class Where {
    public Where(String criteria)
    public String generate()
}

public class ColumnList {
    public ColumnList(Column[] columns)
    public String generate()
}
```

The code in each class becomes incredibly simple. Our required comprehension time to understand any class decreases to almost nothing.

The risk that one function could break another becomes vanishingly small.

Tests also get easier, as the classes are all isolated from one another.

Equally important, when it's time to add the `update` statements, none of the existing classes need change. We code the logic to build `update` statements in a new subclass of `Sql` named `UpdateSql`. No other code in the system will break because of this change.

This restructured `Sql` logic represents the best of all worlds. It supports the SRP (Single Responsibility Principle).

It also supports an Object Oriented class design principle known as the Open-Closed Principle, or OCP.

**Classes should be open for extension but closed for modification**.

**In an ideal system, we incorporate new features by extending the system, not by making modifications to existing code**.

#### Isolating From Change
We learned in Object Oriented 101 that there are concrete classes, which contain implementation details (code), and abstract classes, which represent concepts only.

A client class depending upon concrete details is at risk when those details change. Interfaces and abstract classes help isolate the impact of those details.

Dependencies upon concrete details create challenges for testing our system. If we're building a `Portfolio` class and it depends upon an external `TokyoStockExchange` API to derive the portfolio's value, our test cases are impacted by the volatility of such a lookup. It's hard to write a test when we get a different answer every five minutes!

We create an interface `StockExchange`, that declares a single method:
```java
public interface StockExchange {
    Money currentPrice(String symbol);
}
```

We design `TokyoStockExchange` to implement this interface. We also make sure that the constructor of `Portfolio` takes a `StockExchange` reference as an argument:
```java
public Portfolio {
    private StockExchange exchange;
    public Portfolio(StockExchange exchange) {
        this.exchange = exchange;
    }
    // ...
}
```

We then write a test:
```java
public class PortfolioTest {
    private FixedStockExchangeStub exchange;
    private Portfolio portfolio;

    @Before
    protected void setUp() throws Exception {
        exchange = new FixedStockExchangeStub();
        exchange.fix("MSFT", 100);
        portfolio = new Portfolio(exchange);
    }

    @Test
    public void GivenFiveMSFTTotalShouldBe500() throws Exception {
        portfolio.add(5, "MSFT");
        Assert.assertEquals(500, portfolio.value());
    }
}
```

The lack of coupling means that the elements of our system are better isolated from each other and from change. This isolation makes it easier to understand each element of the system.

By minimizing coupling in this way, our classes adhere to another class design principle known as the Dependency Inversion Principle (DIP). In essence, the DIP says that our classes should depend upon abstractions, not on concrete details.

Instead of being dependent upon the implementation details of the `TokyoStockExchange` class, our `Portfolio` class is now dependent upon the `StockExchange` interface. The `StockExchange` interface represents the abstract concept of asking for the current price of a symbol. This abstraction isolates all of the specific details of obtaining such a price, including from where that price is obtained.

## Chapter 11: Systems

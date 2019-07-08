## Chapter 4: Hoisting

### Chicken or the Egg

```javascript
a = 2;
var a;

console.log( a );
```

Outputs `2` 

---

```javascript
console.log( a );

a = 2;
```

Outputs `undefined`

---



### The Compiler Strikes Again

The **Engine** will compile the JavaScript code before it interprets it. 

Part of the compilation phase is to find and associate declarations according to their proper scope.

#### Both variables and functions are processed first before any part of your code is executed.

```javascript
var a = 2;
```

JavaScript sees this as **two** statements:

1. ```javascript
   var a;
   ```

   * The **declaration** is processed during the **compilation** phase.
   * It is **hoisted** to the top of the code.

2. ```javascript
   a = 2;
   ```

   * The **assignment** is processed in the **execution** phase.
   * Is **left in place**.

**Declarations** of **functions** and **variables** are "hoisted" to the top of the code, while their **assignments** are left **in place**.

In other words, the **egg (declaration)** comes before the **chicken (assignment)**.



#### Hoisting example

```javascript
foo();

function foo() {
    console.log( a ); // undefined
    
    var a = 2;
}
```

The function `foo()` is hoisted to the top of the code so it runs properly.

It is also **per-scope** so the previous example is effectively this:

```javascript
function foo() {
    var a;
    
    console.log( a ); // undefined
    
    a = 2;
}

foo();
```

##### TypeError not ReferenceError

```javascript
foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {
    // ...
}
```

Can be interpreted as:

```javascript
var foo;

foo(); // TypeError
bar(); // ReferenceError

foo = function() {
    var bar = ...self...
    // ...
}
```

### Functions First

Functions are hoisted first.
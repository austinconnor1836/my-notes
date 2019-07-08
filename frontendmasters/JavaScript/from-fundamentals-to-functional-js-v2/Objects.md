## Objects

### Overview

1. Property Access
2. Dot vs Bracket
3. Destructuring
4. Nesting + Loops
5. Nesting + Destructuring

### Assignments with Dots

Using dots with arrays:

- prototype methods
- anything that uses a dot is an **object** in JavaScript



#### Important Concept:

Storing a value by **_reference_** or by **_value_**

```javascript
var person = {};

person.name = "Mrs. White";

var who = person.name;

who; // "Mrs. White"

person.name = "Mr. White";

who; // "Mrs. White"
```

**Primitive values** (booleans, Strings, `var`, etc.) get passed by **value** (own memory space).

**Non-primitive values** (Objects, etc.) get passed by **reference** (sharing memory space).

This is why **immutability** is important in one's data.

#### Arrays

```javascript
var person = [];

person.name = "Mrs. White";

var who = person.name;

who; // "Mrs. White"

typeof person === "array"; // false
typeof person === "object"; // true
```

**Arrays** are objects.

```javascript
var person = [];
var plea = "wouldShe";

person.name = "Mrs. White";

person[plea]; // Uncaught ReferenceError: plea is not defined
```

```javascript
var person["plea"] = "I would never!";
person.plea; // "I would never!"
```

Using dot notation coerces to a string.

```javascript
var person = [];
person.0; // can't do this
```

Cannot use "unusual" characters like starting a variable with hyphens, numbers, etc.


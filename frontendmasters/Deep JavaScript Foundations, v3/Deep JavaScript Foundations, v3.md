# Deep JavaScript Foundations, v3

## Introduction

### Introduction

```javascript
var x = 40;

x++;   // 40
x;     // 41

++x;   // 42
x;     // 42
```

```javascript
var x = "5";
x = x + 1;   // "51"

var y = "5";

y++;        // 5
y;          // 6
```

#### Have you ever read any part of the JS specification?

- not the JavaScript engine

### Understanding Your Code

#### Whenever there's a divergence between what your brain thinks is happening, and what the computer does, that's where bugs enter the code.

### Course Overview

3 pillars to JavaScript:

#### 1st pillar:

Types:

- Primitive Types
- Abstract Operations
- Coercion
- Equality
- TypeScript, Flow. etc.

*It is responsible to avoid this topic.*

#### 2nd pillar:

Scope:

- Nested Scope
- Hoisting
- Closure
- Modules

#### 3rd pillar

Objects (Oriented)

- `this`
- `class {}`
- Prototypes
- OO vs. OLOO

**_Kyle believes we should not use the `class` keyword, but we should learn it._**

This is not the end but the beginning of our journey into JavaScript.

## Types

### Primitive Types

**"In JavaScript, everything is an object."**

- well, nearly everything *behaves* like objects
- not entirely accurate, a bit pervasive

Primitive Types:

1. `undefined`
2. `string`
3. `number`
4. `boolean`
5. `object`
6. `symbol` (added recently in ES6)
   1. not used a lot
   2. used to create pseudo-private keys
7. `null`
8. `bigInt` (future)

Start of somewhat types in JS:

1. `undeclared?`
   1. has a behavior, but not exactly a type according to the spec
2. `null?`
   1. JavaScript calls it a type but it is quirky
3. `function?`
4. `array?`
5. `bigint?`

#### In JavaScript, variables don't have types, values do.

### `typeof` Operator

```javascript
var v;
typeof v;       // undefined

var v = null;
typeof v;       // "object" OOPS!

var = function() {};
typeof v;       // "function" hmmm?

var = [1,2,3];
typeof v;       // "object"
```

- fixing these in the spec would break a lot of people's code

### BigInt

```javascript
// coming soon!
var v = 42n;
// or: BigInt(42)
typeof v;           // "bigint"
```

### Kinds of Emptiness

- **undefined** vs. **undeclared** vs. **uninitialized** (aka TDZ)
  - you cannot touch `uninitialized`, doing so will return the TDZ error
- **the `typeof` operator is the only thing in JavaScript that can reference something `undefined` without returning an error**

### `NaN` & `isNaN`

`NaN` & `isNaN`

```javascript
var myAge = Number("0o46");     // 38
var myNextAge = Number("39");   // 39
var myCatsAge = Number("n/a");  // NaN
myAge = "my son's age";         // NaN

myCatsAge === myCatsAge;        // false OOPS!

isNaN(myAge);                   // false
isNaN(myCatsAge);               // true
isNaN("my son's age");          // true OOPS!

Number.isNaN(myCatsAge);        // true
Number.isNaN("my son's age");   // false
```

`Number.isNaN` coerces to a number before it validates if it is not a number.

**Return the `NaN` when there is no valid number to return.**

### Negative Zero

To mathematicians, it doesn't exist. It certainly exists in JavaScript.

**It is zero with the sign bit showing it to be negative.**

```javascript
var trendRate = -0;
trendRate === -0;             // true

trendRate.toString();         // "0" OOPS!
trendRate === 0;              // true OOPS!
trendRate < 0;                 // false
trendRate > 0;                // false

Object.is(trendRate, -0);     // true
Object.is(trendRate, 0);      // false
```

```javascript
Math.sign(-1);  // -1
Math.sign(1);   // 1
Math.sign(-0);  // -0 WTF?
Math.sign(0);   // 0 WTF?
```

### Type Check Exercise


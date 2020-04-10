# JavaScript the Hard Parts

Presenter: Will Sentance

## JavaScript Principles

**Thread of Execution**: JavaScript goes line-by-line and runs/'executes' each line

Data is saved, like strings and arrays, so we can use that data later in its memory

### Functions

**Execution context**: created to run the code of a function -- has 2 parts (we've already seen them!)

- Thread of execution
- Memory

```javascript
const num = 3;
function multiplyBy2 (inputNumber) {
    const result = inputNumber*2;
    return result;
}

const output = multiplyBy2(num);
const newOutput = multiplyBy2(10);
```



`output = multiplyBy2(3)`

|                 | *Local* Memory      |
| --------------- | ------------------- |
|                 | `inputNumber` : `3` |
|                 | `result`: `6`       |
| `return result` |                     |

The `return` returns the *value* stored in `result`.

### Call Stack

- JavaScript keeps track of what function is currently running (where's the thread of execution)
- Run a function - add to call stack
- Finish running the function - JS removes it from call stack
- Whatever is top of the call stack - that's the function we're currently running

The key word `return` tells JavaScript to move on from the currently running function to the next function in the call stack. Everything else stored in memory inside the function is deleted.

`global()` is always at the bottom of the call stack in JavaScript

**3 core concepts of JavaScript:**

- Memory
- Thread of Execution
- Call stack



## Functions and Callbacks

### Generalized Functions

```javascript
function tenSquared() {
    return 10*10;
}

tenSquared() // 100
```

What about `nineSquared()`? `eightSquared()`?

We are breaking the DRY principle.

**We can generalize the function to make it reusable**

```javascript
function squareNum(num) {
    return num*num;
}
squareNum(10); // 100
squareNum(9); // 81
squareNum(8); // 64
```

Higher order functions allow use to leave some of our functionality unstated.

### Repeating Functionality

```javascript
function copyArrayAndMultiplyBy2(array) {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        output.push(array[i] * 2);
    }
    return output;
}

const myArray = [1,2,3];
const result = copyArrayAndMultiplyBy2(myArray);
```

| Global Memory                                            |
| -------------------------------------------------------- |
| `copyArrayAndMultiplyBy2` : `| function |` (placeholder) |
| `myArray` : `[1,2,3]`                                    |
| `result` :                                               |

New Execution context:
`result = copyArrayAndMultiplyBy2([1,2,3])`

|      | Local Memory         |
| ---- | -------------------- |
|      | `array` : `[1,2,3]`  |
|      | `output` : `[2,4,6]` |

Back in **Global Memory**:

| Global Memory        |
| -------------------- |
| `result` : `[2,4,6]` |



| Call Stack                  |
| --------------------------- |
|                             |
| `copyArrayAndMultiplyBy2()` |
| `global()`                  |

### Higher Order Functions

We could generalize our function - So we pass in our specific instruction only when we run `copyArrayAndManipulate`!

We achieve this by passing in a function to `copyArrayAndManipulate()` as a parameter.

```javascript
function copyArrayAndManipulate(array, instructions) {
    const output = [];
    for (let = 0; i < array.length; i++) {
        output.push(instructions(array[i]));
    }
    return output;
}
function multiplyBy2(input) { return input * 2; }
const result = copyArrayAndManipulate([1,2,3], multiplyBy2);
```

- we are passing in a link, or reference, to the data/function from global memory

### Callbacks & Higher Order Functions

**How was this possible?**

Functions in JavaScript = first class objects (have all the features of an object in JS)

They can co-exist with and can be treated like any other JS object

1. Assigned to variables and properties of other objects
2. Passed as arguments into functions
3. Returned as values from functions

Closure, which will be discussed later: the ability to declare data/functions inside a function to be used/accessed outside the function, outside its scope

**Higher-order functions**: Takes in a function or passes out a function

#### Callbacks and Higher order functions simplify our code and keep it DRY

**Declarative readable code**: Map, filter, reduce - the most readable way to write code to work with data

**Codesmith & pro interview prep**: One of the most popular topics to test in interview both for Codesmith and mid/senior level job interviews

**Asynchronous JavaScript**: Callbacks are a core aspect of `async` JavaScript, and are under-the-hood of promises, `async`/`await`

### Arrow Functions

## Closure

### Closure Introduction

**Closure**

- Closure is the most esoteric of JavaScript concepts
- Enables powerful pro-level functions like 'once' and 'memoize'
- Many JavaScript design patterns including the module pattern use closure
- Build iterators, handle partial application and maintain state in an asynchronous world

**Functions get a new memory every run/invocation**

Suppose we want data to persist inside functions between executions.

It all starts with us **<u>returning a function from another function</u>**

**State**: live data that is being stored in a function at a particular moment in time

State and all data inside a function is deleted after execution, **except for the return value**

This can enable only allowing a function to run once and disallowing a function from running more than once.

### Returning Functions

#### Functions can be returned from other functions in JavaScript

```javascript
function createFunction() {
    function multiplyBy2(num) {
        return num*2;
    }
    return multiplyBy2;
}

const generatedFunc = createFunction();
const result = generatedFunc(3);
```

A function's definition is a value stored in memory.

Our code returns the function definition of `multiplyBy2` and stores it in global memory inside a `const` of `generatedFunc`

Then, it defines a `const` of `result` and stores the value of the **execution** of `generatedFunc(3)`.

**<u>Remember, parentheses distinguish a function from a label</u>**

After JavaScript runs the line `const generatedFunc = createFunction();`, `generatedFunc` has **zero** relationship with `createFunction()`.

`generatedFunc` is the result of the one-time running of `createFunction()` that turned out to be the definition of the function `multiplyBy2`.

So `generatedFunc` is now equal to the definition of `multiplyBy2` function.

**This is the <u>mission-critical</u> part of closure**.

### Nested Function Scope

#### Calling a function outside of the function call in which it was defined

```javascript
function outer() {
    let counter = 0;
    function incrementCounter() { counter ++; }
    return incrementCounter;
}

const myNewFunction = outer();
myNewFunction();
myNewFunction();
```

- `incrementCounter()` returns all of the local data surrounding it, so `counter` is accessible
  - like it is wearing a backpack with local data inside

### Function Closure

Call stack starts with `global()` and `outer()` above it. Then, `outer()` is removed. Then, `myNewFunction()` is pushed onto the stack, then removed. Finally, once again `myNewFunction()` is pushed onto the call stack and removed.

How does a function grab surrounding data for it to be accessed later?

It gets a **hidden property** (connoted with double brackets `[[]]`) called `[[scope]]`.

- **this is what the "backpack" is**

We cannot access it this way:

- `myNewFunction.scope`

**This is the most elegant feature of JavaScript**

- it gives us permanent and private data

### Closure Technical Definition & Review

Book he highly recommends: *If Hemingway Wrote JavaScript* by Angus Croll

He calls the **Local Memory** the **Closed Over Variable Environment (C.O.V.E.)**

JavaScript is a **lexically-scoped language**, as opposed to a *dynamically-scoped* language.

- the data available to a declaration depends on **where the declaration was saved**

- it is Persistent, Lexically or Static, Scoped, Referenced, Data (**P.L.S.R.D.**)
  - the **Backpack**
  - commonly known as **Closure**, but is not entirely accurate as it defines imprecisely

#### What can we call this 'backpack'?

- Closed over 'Variable Environment' (C.O.V.E.)
- Persistent Lexical Scope Referenced Data (P.L.S.R.D.)
- 'Backpack'
- 'Closure'

The 'backpack' (or 'closure') of live data is attached `incrementCounter` (then to `myNewFunction`) through a hidden property known as `[[scope]]` which persists when the inner function is returned out.

### Multiple Closure Instances


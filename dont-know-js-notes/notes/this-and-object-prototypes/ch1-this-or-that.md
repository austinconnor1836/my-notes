# `this` & Object Prototypes

## Chapter 1: *this* Or That?

*"Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke*

### Why `this`?

Before we discuss the "how", let's discuss the "why." Consider this example:

```javascript
function identify() {
	return this.name.toUpperCase();
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
	console.log( greeting );
}

var me = {
	name: "Kyle"
};

var you = {
	name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER
```

This code allows the `identify()` and `speak()` functions to be re-used against multiple *context* (`me` and `you`) objects, rather than needing a separate version of the function for each object.

We could have achieved the same by passing in a context object to both `identify()` and `speak()`:

```javascript
function identify(context) {
  return context.name.toUpperCase();
}

function speak(context) {
  var greeting = "Hello, I'm " + identify( context );
  console.log( greeting );
}

identify( you ); // READER
speak( me ); // Hello, I'm Kyle
```

**Benefits of the `this` mechanism vs. context object**:

- more elegant way of implicitly "passing along" an object reference
- leads to a cleaner API design and easier re-use.

### Confusions

First let us cover how `this` *doesn't* work.

There are two meanings developers often confuse themselves with when thinking about the name "this." Both are incorrect.

#### Itself

The first common temptations is to assume `this` refers to the function itself.

Why would you want to refer to a function from inside itself? Most common reasons are:

- Recursion (calling a function from inside itself).
- having an event handler unbind itself when it's first called.

**_Developers new to JS's mechanisms often think that referencing the function as an object (all functions in JavaScript are objects!) lets you store <u>state</u> (values in properties) between function calls_**. While this is possible and has some limited uses, the rest of the book will expound on many other patterns for **_better places to store state besides the function object_**.

But, we will explore that pattern, to illustrate how **`this` doesn't let a function get a reference to itself** like we might have assumed.

In the following code, we attempt to track how many times a function (`foo`) was called:

```javascript
function foo(num) {
  console.log( "foo: " + num );
  
  // keep track of how many times `foo` is called
  this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
  if (i > 5) {
    foo( i );
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 0 -- WTF?
```

This presumably unexpected behavior stems from a *too literal* interpretation of what `this` (in `this.count++`) means.

At `foo.count = 0`, indeed it's adding a property `count` to the function object `foo`. But for the `this.count` reference inside of the function, `this` is not in fact pointing *at all* to that function object, and so even though the property names are the same, the root objects are different, and confusion ensues.

To reference a function object from inside itself, `this` by itself will typically be insufficient. You generally need a reference to the function object via a lexical identifier (variable) that points at it.

**You cannot refer to an anonymous (unnamed) function unless you use `arguments.callee`, but this is frowned upon. It's best to use a named function (expression)**.

Another way of approaching the ussis is to force `this` to actually point at the `foo` function object:

```javascript
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	// Note: `this` IS actually `foo` now, based on
	// how `foo` is called (see below)
	this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		// using `call(..)`, we ensure the `this`
		// points at the function object (`foo`) itself
		foo.call( foo, i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4
```

### Its Scope

There exists a misconception of that `this` refers to a function's scope.

**_`this` does not refer to a function's lexical scope in any way_**.

It is true that internally, scope is kind of like an object with properties for each of the available identifiers. But the scope "object" is not accessible to JavaScript code. It's an inner part of the *Engine*'s implementation.

Look at the following code that does not compile:

```javascript
function foo() {
  var a = 2;
  this.bar();
}

function bar() {
  console.log( this.a );
}

foo(); // undefined
```

There are several mistakes with this code. 

`this.bar()` works, even if by accident. The developer was trying to bridge the lexical scopes of `foo()` and `bar()`, so that `bar()` had access to the variable `a` in the inner scope of `foo()`. **No such bridge is possible**.

**You cannot use `this` reference to look something up in a lexical scope. It is not possible**.

### What's `this`?

`this` is not an author-time binding but a runtime binding.

`this` binding has nothing to do with where a function is declared, but has instead everything to do with the manner in which the function is called.

When a function is invoked, an activation record, otherwise known as an execution context, is created. This record contains information about where the function was called from (the call-stack), *how* the function was invoked, what parameters were passed, etc. One of the properties of this record is the `this` reference which will be used for the duration of that function's execution.

### Review (TL;DR)

`this` is neither a reference to the function itself, nor is it a reference to the function's *lexical* scope.

`this` is actually a binding that is made when a function is invoked, and *what* it references is determined entirely by the call-site where the function is called.
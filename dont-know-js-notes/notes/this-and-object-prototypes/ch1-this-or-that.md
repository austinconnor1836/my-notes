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
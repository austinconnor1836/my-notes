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


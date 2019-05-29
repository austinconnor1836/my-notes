# `this` & Object Prototypes

## Chapter 2: `this` All Makes Sense Now!

`this` is a binding made for each function invocation, based entirely on its **call-site** (how the function is called).

#### Call-site

**Call-site**: where a function is called **not** where it is declared.

**Call-stack**: the stack of functions that have been called to get us to the current moment in execution.

The call-site we care about is in the invocation before the currently executing function.

Call-stack and call-site example:

```javascript
function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`

    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}

function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`

    console.log( "foo" );
}

baz(); // <-- call-site for `baz`
```

The actual call-site (from the call-stack) is the only thing that matters for `this` binding.

Use developer tools by placing a breakpoint or `debugger` in your code to see what functions have been called (the call-stack approximately).

#### Nothing But Rules

How does the call-site determine where `this` will point during the execution of a function?

Inspect the call-site and determine which of 4 rules applies.

##### Default Binding

The most common case of function calls: standalone function invocation (**_think of this as the default catch-all rule when none of the other rules apply_**).

Consider this code:

```javascript
function foo() {
	console.log( this.a );
}

var a = 2;

foo(); // 2
```

Variables declared in the global scope, as `var a = 2` is, are synonymous with global-object properties of the same name. **They're not copies of each other, they are each other**. Think of it as two sides of the same coin.

`this.a` resolves to the global variable `a` because the **default binding** for `this` applies to the function call, and so points `this` at the global object.

If `strict mode` is in effect, the global object is not eligible for the **default binding**, so the `this` is instead set to `undefined`:

```javascript
function foo() {
	"use strict";

	console.log( this.a );
}

var a = 2;

foo(); // TypeError: `this` is `undefined`
```

However, even though the overall `this` binding rules are entirely based on the call-site, the global object is only eligible for the **default binding** if the contents of `foo()` are not running in `strict mode`. The `strict mode` state of the call-site of `foo()` is irrelevant:

```javascript
function foo() {
	console.log( this.a );
}

var a = 2;

(function(){
	"use strict";

	foo(); // 2
})();
```

Use `strict mode` exclusively or non-`strict mode` for the entirety of your code. It is bad practice otherwise.

#### Implicit Binding

Does the call-site have a context object, also referred to as an owning or containing object, though these alternate terms could be slightly misleading.


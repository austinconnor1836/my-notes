# `this` & Object Prototypes

## Chapter 2: `this` All Makes Sense Now!
### Nothing But Rules
The call-site we care about is in the invocation *before* the currently executing function (**call-stack**).

#### Default Binding
Consider this code:
```javascript
function foo() {
    console.log( this.a );
}

var a = 2;

foo(); // 2
```

Variables declared in the global scope are synonymous with global-object properties of the same name. They are not copies of each other, they *are* each other.

`this.a` resolves to our global variable `a` because in this case, the *default binding* for `this` applies to the function call, and so points `this` at the global object.

If `"use strict"` was placed inside `foo()`, then `foo()` would return `undefined` as the global object is not eligibile for the *default binding*.

The global object is **only** eligible for the *default binding* if the **contents** of `foo()` are **not** running in `strict mode`:
```javascript
function foo() {
    console.log(this.a);
}

var a = 2;

(function() {
    "use strict";

    foo(); // 2
})();
```

Note: either incorporate `"use strict"` in all of your application or not at all.

### Implicit Binding
Consider:
```javascript
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2
```

At the point that `foo()` is called, it's preceded by an object reference to `obj`.

When there is a context object for a function reference, the *implicit binding* rule says that it's *that* object which should be used for the function call's `this` binding.

Because `obj` is the `this` for the `foo()` call, `this.a` is synonymous with `obj.a`.

Only the top/last level of an object property reference chain matters to the call-site:
```javascript
function foo() {
	console.log( this.a );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42
```

### Implicitly Lost
```javascript
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"
```

Even though bar appears to be a reference to `obj.foo`, in fact, it's really just another reference to `foo` itself.

The call-site matters and is `bar()`. It is a plain and undecorated call and thus the *default binding* applies.

Consider:
```javascript
function foo() {
	console.log( this.a );
}

function doFoo(fn) {
	// `fn` is just another reference to `foo`

	fn(); // <-- call-site!
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"
```

The `this` in `this.a` is inside the `doFoo()` function. That is the call-site so the global object `a` is not in the object context that has access to it.


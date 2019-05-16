## Chapter 5: Scope Closure

**Closure is all around you in JavaScript, you just have to recognize and embrace it.**

Closures happen as a result of writing code that relies on lexical scope. Closures are created and used for you all over your code.

Understanding closures is like when Neo sees the Matrix for the first time.

### Nitty Gritty

*Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.*

```javascript
function foo() {
    var a = 2;
    
    function bar() {
        console.log( a );  // 2
    }
    
    bar();
}

foo();
```



From a purely academic perspective, what is said of the above snippet is that the function `bar()` has a *closure* over the scope of `foo()`.

More simple, `bar()` closes over the scope of `foo()`. This is because `bar()` appears nested inside of `foo()`.

```javascript
function foo() {
    var a = 2;
    
    function bar() {
        console.log( a );
    }
    
    return bar;
}

var baz = foo();

baz(); // 2 -- closure was just observed
```



By virtue of where it was declared, `bar()` has a lexical scope closure over that inner scope of `foo()`, which keeps that scope alive for `bar()` to reference at any later time.

**`bar()` still has a reference to that scope, and that reference is called closure.**

So, a few microseconds later, when the variable `baz` is invoked (invoking the inner function we initially labeled `bar`), it duly has *access* to author-time lexical scope, so it can access the variable `a` just as we'd expect.

The function is being invoked well outside of its author-time lexical scope. **Closure** lets the function continue to access the lexical scope it was defined in at author-time.

These passing around of functions can be indirect too:

```javascript
var fn;

function foo() {
    var a = 2;
    
    function baz() {
        console.log( a );
    }
    
    fn = baz; // assign `baz` to global variable
}

function bar() {
    fn(); // I saw closure!
}

foo();

bar(); // 2

```



### Now I Can See

### Loops + Closure

```javascript
for (var i=1; i<=5; i++) {
  setTimeout( function timer(){
    console.log( i );
  }, i*1000 );
}
```

This actually prints out `6` 5 times rather than `1..5`.

The way scope works, all 5 of those functions, though they are defined separately in each loop iteration, all **are closed over the same shared global scope**, which has, in fact, only one `i` in it.

Let's try:

```javascript
for (var i=1; i<=5; i++) {
  (function(){
    setTimeout( function timer(){
      console.log( i );
    }, i*1000);
  })();
}
```

This still does not work. Each timeout function callback is indeed closing over its own per-iteration scope created respectively by each IIFE (Immediately Invoked Function Expression).

It's not enough to have a scope to close over **if that scope is empty**. Our IIFE is just an empty do-nothing scope. It needs *something* in it to be useful to use.

It needs its own variable, with a copy of the `i` value at each iteration.

```javascript
for (var i=1; i<=5; i++) {
  (function(){
    var j = i;
    setTimeout( function timer(){
      console.log( j );
    }, j*1000);
  })();
}
```

**This works**.

Slight variation some prefer:

```javascript
for (var i=1; i<=5; i++) {
  (function(j){
    setTimeout( function timer(){
      console.log( j );
    }, j*1000);
  })(i);
}
```

The use of an IIFE inside each iteration created a new scope for each iteration, which gave our timeout function callbacks the opportunity to close over a new scope for each iteration, one which had a variable with the right per-iteration value in it for us to access.

#### Block Scoping Revisited

Chapter 3 showed us the `let` declaration, whcih hijacks a block and declares a variable right there in the block.

**It essentially turns a block into a scope that we can close over**. So, the following code "just works":

```javascript
for (var i=1; i<=5; i++) {
  let j = i; // block-scope for closure
  setTimeout( function timer(){
      console.log( j );
    }, j*1000);
}
```

`let` also has the behavior in the head of a `for` loop by declaring the variable **for each iteration**. And, it will, helpfully, be initialized at each subsequent iteration with the value from the end of the previous iteration:

```javascript
for (let i=1; i<=5; i++) {
  setTimeout( function timer(){
      console.log( i );
    }, i*1000);
}
```

This is an example of block scoping and closure working hand-in-hand.

### Modules

Other code patterns which leverage the power of closure but which do not on the surface appear to be about callbacks.

Module pattern (aka "Revealing Module"):

```javascript
function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];
  
  function doSomething() {
    console.log( something );
  }
  
  function doAnother() {
    console.log( another.join( " ! " ));
  }
  
  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

Without the execution of the outer function, the creation of the inner scope and the closures would not occur.

The object we return has references on it to our inner functions, but not to our inner data variables. We keep those hidden and private. **It's appropriate to think of this object return value as essentially a <u>public API for our module</u>**.

**Note**: we don't have to return an object, we can also return a function (jQuery does this, the `jQuery` and `$` identifiers are the public API for the jQuery "module", but they are, themselves, just a function, which can itself have properties, **since all functions are objects**).

The `doSomething()` and `doAnother()` functions have closure over the inner scope of the module "instance" (arrived at by actually invoking `CoolModule()`). When we transport those functions outside of the lexical scope, by way of property references on the object we return, we have now set up a condition by which closure can be observed and exercised.

Two requirements for the module pattern to be exercised:

1. There must be an outer enclosing function, and it must be invoked at least once (each time creates a new module).
2. The enclosing function must return back at least one inner function, so that this inner function has closure over the private scope, and can access and/or modify that private state.

An object with a function property on it alone is not really a module. An object which is returned from a function invocation which only has data properties on it and no closured functions is not really a module, in the observable.

Modifying the `CoolModule()` module above to be a "**singleton**", one instance:

```javascript
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1, 2, 3];
  
  function doSomething() {
    console.log( something );
  }
  
  function doAnother() {
    console.log( another.join( " ! " ) );
  }
  
  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

Here we turned our module function into an IIFE (see Chapter 3), and we immediately invoked it and assigned its return value directly to our single module instance identifier `foo`.

Modules are just functions so they can receive parameters:

```javascript
function CoolModule(id) {
  function identify() {
    console.log( id );
  }
  
  return {
    identify: identify
  };
}

var foo1 = CoolModule( "foo 1" );
var foo2 = CoolModule( "foo 2" );

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"
```

**Public API module pattern**:

```javascript
var foo = (function CoolModule(id) {
  function change() {
    // modifying the public API
    publicAPI.identify = identify2;
  }
  
  function identify1() {
    console.log( id );
  }
  
  function identify2() {
    console.log( id.toUpperCase() );
  }
  
  var publicAPI = {
    change: change,
    identify: identify1
  };
  
  return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```

By retaining an inner reference to the public API object inside your module instance, you can modify that module instance **from the inside**, including adding and removing methods, properties, and changing their values.

### Modern Modules

Various module dependency loaders/managers essentially wrap up this pattern of module definition into a friendly API. Rather than examine any one particular library, let me present a *very simple* proof of concept **for illustration purposes (only)**:

```javascript
var MyModules = (function Manager() {
  var modules = {};
  
  function define(name, deps, impl) {
    for (var i=0; i<deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply( impl, deps );
  }
  
  function get(name) {
    return modules[name];
  }
  
  return {
    define: define,
    get: get
  };
})();
```

The key part of this code is `modules[name] = implies.apply(impl, deps)`. This is invoking the definition wrapper function for a module (passing in any dependencies), and strong the return value, the module's API, into an internal list of modules tracked by name.

Here's how it could be used to define some modules:

```javascript
MyModules.define( "bar", [], function() {
  function hello(who) {
    return "Let me introduce: " + who;
  }
  
  return {
    hello: hello
  };
});

MyModules.define( "foo", ["bar"], function(bar) {
  var hungry = "hippo";
  
  function awesome() {
    console.log( bar.hello( hungry ).toUpperCase() );
  }
  
  return {
    awesome: awesome
  };
} );

var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );

console.log(
  bar.hello( "hippo" )
); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

==**The key take-away is that there's not really any particular "magic" to module managers.**==

They fulfill both characteristics of the module pattern:

- invoking a function definition wrapper
- keeping its return value as the API for that module

In other words, modules are just modules, even if you put a friendly wrapper tool on top of them.

### Future Modules

When loaded via the module system, ES6 treats a file as a separate module.Each module can both import other modules or specific API members, as well export their own public API members.

**Note**: Function-based modules aren't a statically recognized pattern (something the compiler knows about), so their API semantics aren't considered until run-time. That is, you can actually modify a module's API during the run-time (see earlier `publicAPI` discussion).

By contrast, ES6 Module APIs are static (the APIs don't change at run-time).

ES6 modules **do not** have an "inline" format, they must be defined in separate files (one per module). The browsers/engines have a default "module loader" (which is overridable, but that's well-beyond our discussion here) which synchronously loads a module file when it's imported.

### Review

**Closure is when a function can remember and access its lexical scope even when it's invoked outside its lexical scope**.

Closures enable patterns like *modules* in their various forms.

**Modules** require two key characteristics:

1. an outer wrapping function being invoked, to create the enclosing scope
2. the return value of the wrapping function must include reference to at least one inner function that then has closure over the private inner scope of the wrapper.
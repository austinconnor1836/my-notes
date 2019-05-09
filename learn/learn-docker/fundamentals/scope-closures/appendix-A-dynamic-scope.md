# Scope & Closures

## Appendix A: Dynamic Scope

The "Dynamic Scope" model in contrast with "Lexical Scope" model.

Lexical Scope is how scope works in JavaScript (and in fact, most other languages).

Dynamic Scope is a near cousing to the `this` mechanism in JavaScript, which we covered in the "*this & Object Prototypes*" title of this book series.

In Chapter 2, lexical scope was defined as the set of rules about how the **_Engine_** can look-up a variable and where it will find it.

**The key characteristic to <u>lexical scope</u> is that it is defined at author-time, when the code is written** (assuming you don't cheat with `eval()` or `with`).

Dynamic scope implies that there exists a model whereby scope can be determined dynamically at runtime, rather than statically at author-time. That is in fact the case.

```javascript
function foo() {
  console.log( a ); // 2
}

function bar() {
  var a = 3;
  foo();
}

var a = 2;

bar();
```

Lexical scope holds that the RHS reference to `a` in `foo()` will be resolved to the global variable `a`, which will result in value `2` being output.

Dynamic scope **cares where a function was <u>called from</u>**. In other words, the scope chain is based on the **call-stack**, not the nesting of scopes in code.

So, if JavaScript had dynamic scope, when `foo()` is executed, **theoretically** the code below would instead result in `3` as the output:

```javascript
function foo() {
  console.log( a ); // 3 (not 2!)
}

function bar() {
  var a = 3;
  foo();
}

var a = 2;
bar();
```

This is because `foo()` cannot resolve the variable reference for `a`, instead of stepping up the nested (lexical) scope chain, it walks up the call-stack, to find where `foo()` was **called from**. Since `foo()` was called from `bar()`, it checks the variables in scope for `bar()`, and finds an `a` there with value `3`.

==To be clear, JavaScript **does not have dynamic scope**. It has lexical scope. Plain and simple.== But the `this` mechanism is kind of like dynamic scope.

The key contrast: **lexical scope is write-time, whereas dynamic scope (and `this`) are runtime**.

Lexical scope **cares where a function was declared**.

Dynamic scope **cares where a function was <u>called from</u>**.

Finally, `this` **cares how a function was called**, which shows how closely related the `this` mechanism is to the idea of dynamic scoping. To dig more into `this`, read the title "*this & Object Prototypes*".
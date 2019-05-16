## Appendix A: Dynamic Scope

**Dynamic scope** is a near cousin to another mechanism (`this`) in JavaScript.

As we saw in Chapter 2, **lexical scope** is the set of rules about how the *Engine* can look-up a variable and where it will find it.

**Lexical scope**:

- defined at **author-time**, when the code is written, assuming you don't cheat with `eval()` or `with`.

**Dynamic scope**:

- implies that there's a model whereby **scope can be determined dynamically at runtime**, rather than statically at author-time.

- Example:

  - ```javascript
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

    - Lexical scope says that `a` will end up with the value `2`.
    - Dynamic scope, by contrast, is only concerned with **where they are called from**. The scope-chain is based on the **call-stack**, not the nesting of scopes in code.
      - So theoretically, when `foo()` is executed, the code above would instead result in `3` as the output.
    - It results in `3` because when `foo()` cannot resolve the variable reference for `a`, instead of stepping up the nested (lexical) scope chain, it walks up the call-stack, to find where `foo()` was *called from*. 
      - Since `foo()` was called from `bar()`, it checks the variables in scope for `bar()`, and finds and `a` there with value `3`.

To be clear, **JavaScript does not have dynamic scope**. It has lexical scope. Plain and simple. But the `this` mechanism is kind of like dynamic scope.

| **Lexical scope**                   | **Dynamic scope (and `this`)**         |
| ----------------------------------- | -------------------------------------- |
| write time                          | runtime                                |
| cares where a function was declared | cares where a function was called from |

Finally, `this` cares *how a function was called*
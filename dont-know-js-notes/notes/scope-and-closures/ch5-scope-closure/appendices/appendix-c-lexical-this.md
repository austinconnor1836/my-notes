## Appendix C: Lexical-this

ES6 adds a special syntactic form of function declaration called the "arrow function". It looks like this:

```javascript
var foo = a => {
  console.log( a );
};

foo( 2 ); // 2
```

The `=>` (fat arrow) is short for the `function` keyword.

We introduce "lexical-this".

Arrow-functions do not behave at all like normal functions when it comes to their `this` binding. **_They discard all the normal rules for the `this` binding_**. Instead they take on the `this` value of their immediate lexical enclosing scope, whatever it is.

One detraction from arrow-functions is that they are anonymous, not named.

**Arrow-functions are not just about less typing of "function".**

They have an *intentional behavioral difference* that we should learn and understand, and if we so choose, leverage.
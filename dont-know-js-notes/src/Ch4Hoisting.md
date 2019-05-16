## Chapter 4: Hoisting

Consider the following code:

```javascript
a = 2;
var a;
console.log( a );
```

Many would expect the `console` to read `undefined`, but the output will be `2`;

Also,

```javascript
console.log( a );
var a = 2;
```

This would not produce a `ReferenceError` as one might expect. It would actually output `undefined`. **_This is due to the compiler_**. 

The **_Engine_** will compile the Javascript code before it interprets it.
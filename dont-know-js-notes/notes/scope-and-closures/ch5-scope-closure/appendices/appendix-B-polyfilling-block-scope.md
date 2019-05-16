## Appendix B: Polyfilling Block Scope

In Chapter 3, we saw that `with` and the `catch` clause are both tiny examples of **block scope**. They have existed in JavaScript since at least the introduction of ES3.

But with ES6, `let` finally gives full, unfettered block-scoping capability to our code.

Block-scoping does not work the same in ES6 environments as pre-ES6 environments. The solution:

```javascript
{
    let a = 2;
    console.log( a ); // 2
}

console.log( a ); // ReferenceError
```

Can produce same functionality as this using the `catch` clause:

```javascript
try{throw 2}catch(a){
    console.log( a ); // 2
}

console.log( a ); // ReferenceError
```

**The `catch` clause has block-scoping so it can be used as a polyfill for block scope in pre-ES6 environments**.

Even if no one wants to write this code since it is ugly, the point is that tools can transpile ES6 code to work in pre-ES6 environments.

### Traceur

Google maintains a project called "Traceur", which is exactly tasked with transpiling ES6 features into pre-ES6 (mostly ES5, but not all) for general usage. The TC39 committee relies on this tool (and others) to test out the semantics of the features they specify.

### Implicit vs. Explicit Blocks

Reducing the pitfalls of block-scoping and taking advantage of block-scoping's upside:

Consider this alternate form of `let`, called the "let block" or "let statement" (contrasted with "let declarations" from before).

```javascript
let (a = 2) {
    console.log( a ); // 2
}

console.log( a ); // ReferenceError
```

Instead of hijacking an existing block, the let-statement creates an explicit block for its scope binding.

This forces all the declarations to the top of the block making it easier to look at any block and know what's scoped to it and not.

This mirrors the approach many people take in function-scoping when they manually move/hoist all their `var` declarations to the top of the function. The let-statement puts them there at the top of the block by intent, and if you don't use `let` declarations strewn throughout, your block-scoping declarations are somewhat easier to identify and maintain.

**There is a problem. This let-statement form is not included in ES6 and neither does the official Traceur compiler accept that form of code**. There are two options to rectify this:

1. We can use ES6-valid syntax with a little code discipline:

   ```javascript
   /* let */ { let a = 2;
             console.log( a );
   }
   
   console.log( a ); // ReferenceError
   ```

   

2. The author developed a tool called "let-er" to transpile let statement blocks to valid, working code.

### Performance

Why not just use an IIFE to create the scope?

Answer: Because the performance of `try/catch` *is slower*. Google is actively trying to quicken this with their Traceur tool.
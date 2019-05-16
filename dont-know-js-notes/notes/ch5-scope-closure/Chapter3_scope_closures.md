## Chapter 3: Scope & Closures

### Blocks as Scopes

Block-scoping is all about declaring variables as close as possible to where they will be used.  
**Least Privilege Exposure:** Using as minimal amount of code that is necessary to function.  
The variable declaration in the catch clause of a try/catch is block scoped.  
#### let
`let` implicitly hijacks any block's scope for its variable declaration
```javascript
var foo = true;
if (foo) {
    let bar = foo * 2;
    bar = something( bar );
    console.log( bar );
}

console.log( bar ); // ReferenceError
```

Explicit block-scoping style is preferable over implicit or subtle code:
```javascript
var foo = true;

if (foo) {
    { // <-- explicit block
        let bar = foo * 2;
        bar = something( bar );
        console.log( bar );
    }
}

console.log( bar ); //ReferenceError
```

We can create an arbitray block for `let` to bind to by simply including a `{ .. }` pair 
anywhere a statement is valid grammar.

However, declarations made with `let` will _not_ hoist to the entire scope of the block
they appear in. Such declarations will not observably "exist" in the block until the declaration
 
```javascript
function process(data) {
    // do something interesting
}

// anything declared inside this block can go away after!
{
    let someReallyBigData = { .. };
    
    process( someReallyBigData );
}

var btn = document.getElementById( 'my_button');

btn.addEventListener( 'click', function click(evt) {
    console.log('button clicked');
}, /*capturingPhase=*/false );
```

Declaring explicit blocks for variables to locally bind to is a powerful tool that you can  
add to your code toolbox.

`let` and `const` are both **blocked-scoped variables**. `const` has a fixed value  
and cannot be changed once declared.
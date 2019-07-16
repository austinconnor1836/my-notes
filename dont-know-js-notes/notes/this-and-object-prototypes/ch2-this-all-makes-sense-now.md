# `this` & Object Prototypes

## Chapter 2: `this` All Makes Sense Now!
### Nothing But Rules
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

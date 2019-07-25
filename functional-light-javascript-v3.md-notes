## Table of Contents

- [Function Purity](#function-purity)
  * [Side Effects](#side-effects)
  * [Pure Functions](#pure-functions)
  * [Reducing Surface Area](#reducing-surface-area)
  * [Same Input Same Output](#same-input-same-output)
  * [Function Purity: Level of Confidence](#function-purity-level-of-confidence)
  * [Extracting Impurity](#extracting-impurity)
  
<!-- table of contents -->
## Function Purity
Avoid side effects with function calls.

### Side Effects:
- I/O (console, files, etc)
- Database Storage
- Network Calls
- DOM
- Timestamps
- Random Numbers
- CPU Heat
- CPU Time Delay

A program without side effects is impossible. We must be pragmatic about side effects.
Side effects impurify the benefits of functional programming.
Avoid them where possible and when used, make them obvious.
It is vastly more likely a bug is in a side effect.

### Pure Functions
- No side effects
- Takes all inputs as direct and outputs as direct
- We care about *function calls*

Impure Function example:
```javascript
const z = 1;

function addAnother(x,y) {
  return addTwo(x,y) + z;
}
```
`const z` is constant, which means it cannot be reassigned. So, the above function is pure.
It could be a `var`, as long as it is not reassigned.
`addTwo()` could also be reassigned, but in this example, it is not so `addAnother()` is still pure.

**Important Note**: as developers, we must show that a constant is a constant to make it easy to understand the code's pureness.

### Reducing Surface Area
- Reducing the lines of code (surface area) so that the possibility of reassignment is lower.
- Increases readability
  - Both of the functions in the below example are pure:
  ```javascript
  function addAnother(z) {
    return function addTwo(x,y) {
      return x + y + z;
    };
  }
    ```
### Same Input, Same Output
```javascript
function getId(obj) {
  return obj.id;
}
```
- What is this function's predictability or reliability of always producing the same output?
- Without looking at outside code, we are pretty confident it would produce the same output everytime.
```javascript
function getId(obj) {
  return obj.id;
}

getId({
  get id() {
    return Math.random();
  }
});
```
- Now, our confidence level dropped significantly as the revealing code shows a getter method that assigns `obj.id` a random number everytime.
- We want the reader of our code to trust our code to be pure (could be me in the future).
- Pure function calls act in isolation. Everytime we execute the same function, with the same inputs, we will always get the same output.
- As much as possible, we want all of our function calls to be pure.

### Function Purity: Level of Confidence
- How confident are we that a function is pure? The answer is not a binary yes or no, but resides on a spectrum of confidence.
- **Remember**: function calls, not definitions

### Extracting Impurity
- Database calls are inherently impure.


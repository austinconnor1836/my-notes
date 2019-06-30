## Chapter 3: Control Flow

### 3.7 Break and Continue

A `break` causes the innermost enclosing loop or `switch` to be exited immediately.

The `continue` statement is related to `break`, but less often used; **it causes the next iteration of the enclosing `for`, `while`, or `do` loop to begin**.

- in the `while` and `do`, this means that the test part is executed immediately; in the `for`, control passes to the increment step.
- the `continue` applies only to loops, not to `switch`. A `continue` inside a `switch` inside a loop causes the next loop iteration.

### 3.8 Goto and Labels


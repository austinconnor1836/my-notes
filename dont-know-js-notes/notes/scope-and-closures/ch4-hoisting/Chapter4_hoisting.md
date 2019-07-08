## Chapter 4: Hoisting
#### The Compiler Strikes Again
The best way to think about things is that all declarations, both variables and functions,  
are processed first, before any part of your code is executed.  
When you see `var a=2`, Javascript thinks of it as two statements: `var a;` and `a = 2`.  
The first statement, the declaration, is process during the compilation phase. The second  
statement, the assignment, is left **in place** for the execution phase.  
In other words, **the egg (declaration) comes before the chicken (assignment).**  
Declaration is "hoisted" to the top and performed before the assignment.  

#### Functions First

# Go for JavaScript Developers

By Brenna Martenson

https://github.com/martensonbj/fem-intro-to-go

**Go** was built in 2007 at Google

1. Fast compile times
2. Ease of development
3. Fast execution

#### Enter: Go

- Fast compile time
- Lots in common with C
- Reduces complexity of C
- Wicked fast build time

It does this:

- Lightweight type system
- Concurrency
- Automatic garbage collection
- Strict dependencies
- Convention

## Table of Contents

### Go Documentation Practice

#### Exercise 1A: Find Stuff

Answer the following questions

1. Read about `for loops` in the _Effective Go_ document

   1. What kind of loop doesn't exist in Go? **There is no `do-while` loop in Go. Go unifies `for` and `while`.**

      ```go
      sum := 0
      for i:= 0; i < 10; i++ {
          sum += i
      }
      ```

2. Read about the `fmt` *package*

   1. What does `fmt.Println()` return? **Returns a integer of the number of bytes written and any write-error encountered. <u>It does not print out a string, but bytes and any write-errors</u>.**

3. Find a *blog post* about the recent release of Go 1.13

   1. What are some of the new features?
      - The `go` command now downloads and authenticates modules using the Go module mirror and Go checksum database by default
      - Improvements to number literals
      - Error wrapping
      - TLS 1.3 on by default
      - Improved modules support

### Go vs JavaScript Comparison

| Go                                                  | JavaScript                           |
| --------------------------------------------------- | ------------------------------------ |
| Strongly Typed: String, Float, Int, Byte, Struct... | Dynamically typed (think Typescript) |
|                                                     |                                      |
|                                                     |                                      |
|                                                     |                                      |

<table>
    <tr>
        <th colspan="2" style="text-align:center;">Typing</th>
    </tr>
    <tr>
        <td>Go</td>
        <td>JavaScript</td>
    </tr>
    <tr>
        <td>
            Strongly Typed
            <ul>
                <li>String, Float, Int, Byte, Struct...</li>
            </ul>
        </td>
        <td>
            Dynamically typed
            <ul>
                <li>(Typescript)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th colspan="2" style="text-align:center;">Structures</th>
    </tr>
     <tr>
        <td>
            Structs, Pointers, Methods, Interfaces
            <ul>
                <li>Define behavior and attributes</li>
            </ul>
        </td>
         <td>
            ES6 Classes (kind of)
             <ul>
                <li>Define behavior and attributes</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th colspan="2" style="text-align:center;">Error handling</th>
    </tr>
    <tr>
        <td>
            Explicit
            <ul>
                <li>Sad path won't handle itself</li>
            </ul>
        </td>
        <td>
            Built in
            <ul>
                <li>You'll get yelled at regardless</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th colspan="2" style="text-align:center;">Multi-tasking</th>
    </tr>
    <tr>
        <td>
            Multi-threaded
            <ul>
                <li>Concurrency, Goroutines, Sync</li>
            </ul>
        </td>
        <td>
            Single-Threaded
            <ul>
                <li>Callbacks, async await, sagas, sadness</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th colspan="2" style="text-align:center;">Opinionated-ness</th>
    </tr>
    <tr>
        <td>
            Strong Opinions
            <ul>
                <li>Convention, built in, tooling and linters</li>
                <li>Looking another person's <code>go</code> code should be similar to yours.</li>
            </ul>
        </td>
        <td>
            Fluid Opinions
            <ul>
                <li>Subjective to the mood that day</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th colspan="2" style="text-align:center;"></th>
    </tr>
    <tr>
        <td>
            <ul>
                <li></li>
            </ul>
        </td>
        <td>
            <ul>
                <li></li>
            </ul>
        </td>
    </tr>
</table>

### Anatomy of a Go File

Every `go` program needs both a package `main` and a `main` function.

To run program: `go run <FILENAME>.go`

## Printing

### Printing with `fmt`

`go` playground: https://play.golang.org

`fmt.Printf("Hello, my name is %s", "Austin")`

### Printing Exercise

To find info on a package: `go doc fmt`

To get info on what a function does: `go doc fmt.Println`

## Basic Go Syntax

### Types

| Type    | Syntax                                                  | Examples              |
| ------- | ------------------------------------------------------- | --------------------- |
| Integer | `var age int = 21`                                      | `1`, `2`, `44`        |
| Float   | `var gpa float64 = 4.0`                                 | `1.5`, `3.14`, `2100` |
| String  | `var plant string = "ficus"` (always double quotes)     | `"ficus"`             |
| Boolean | `var canBrink bool = age > 21`, `&& || ! < <= >= == !=` | `true`, `false`       |

#### `Typeof()`

To determine the type of a variable:

```go
import "fmt"
import "reflect"

func main() {
    var x = "What am I"
    fmt.Println(reflect.TypeOf(x))
}
```

Also, `%v` is a generic verb for "value", `%T` is a verb for Type:

```go
var x = "What am I"
fmt.Printf("The type of `%v` is %T", x, x)
```

### Variables

```go
package main

import "fmt"

func main() {
    var name string = "Beyonce"
    fmt.Println(name)
}
```

- you can leave out the type definition if it is easy for the `go` compiler to determine the type

We can leave it unassigned, but we **must specify the type**: `var name string`

Can do multiple assignments: `var name, name2 = "Beyonce", "Lizzo"`

Has to be within functions: `name := "Beyonce"`

- the `:` assigns the value and the type

### Control Structures

#### If Statements

`if someVar > 10 { }`

- parantheses are not required

#### Switch

```go
  var city string

  switch city {
  case "Des Moines":
      fmt.Println("You live in Iowa")
  case "Minneapolis,", "St Paul":
      fmt.Println("You live in Minnesota")
  case "Madison":
      fmt.Println("You live in Wisconsin")
  default:
      fmt.Println("You're not from around here.")
  }
```

#### For loops

```go
func main() {
    
    for i := 1; i <= 100; i++ {
        fmt.Println(i)
    }
    
    var mySentence = "This is a sentence."
    
    for index, letter := range mySentence {
        fmt.Println("Index:", index, "Letter:", letter)
    }
}
```

- can use `_` if you do not need to use a value in `go`

## Complex Structures

### Functions & Variadic Functions

```go
func printAge(age int) int {
    fmt.Println(age)
    return age
}
```

Multiple return values:

```go
func printAge(age int) (int, int) {
    fmt.Println(age)
    return 0, age
}
```

Named returned values:

```go
func printAge(age int) (ageOfSally int, ageOfBob int) {
    ageOfBob = 21
    ageOfSally = 16
    return
}
```

- `go` instantiates placeholders so we do not need to instantiate variables like `ageOfBob` and `ageOfSally`

Collection of integers as argument:

```go
func printAge(ages ...int) int {
    ...
}
```

Also:

```go
func printAge(age1, age2, age3 int) int {
    ...
}
```

### Functions exercise

Exercise 4a: return average of 3 numbers

```go
package main

import "fmt"

func main() {
	fmt.Println(average(3, 6, 9)
}

func average(nums ...float32) (averageVal float32) {

	for _, num := range nums {
		averageVal += num
	}
	return averageVal / 3
}
```

Exercise 4b: use variadic function that takes in an unknown number of arguments

Same as above

### Arrays

In `go`:

```go
// initialize an empty array
var scores = [5]float64

// Eventually this array can ONLY contain floats and a length of 5:
[float64, float64, float64, float64, float64]
```

Whereas in `JavaScript`:

```javascript
// Initialize an empty array
const grabBag = []

// Eventually this array could have values that represent these types:
const grabBag = [string, int, boolean, float64]

// or
const grabBag = [string, string, string, string, integer, boolean, float64]
```

#### Arrays: Defining Values

```go
var scores [5]float64 = [5]float64{9, 1.5, 4.5, 7, 8}
scores := [5]float64{9, 1.5, 4.5, 7, 8}
scores := [...][5]float64{9, 1.5, 4.5, 7, 8}
```

### Make

- having to know the length of the array when you instantiate it seems problematic:
  - **enter: the slice**
  - **slice**: segments of an underlying array
  - **(+ Make)**: must be associated with space in memory
    - "initializes and allocates space in memory for a slice, map, or channel"

```go
var mySlice []int = make([]int, 5)
```

Set 5 elements, with the capacity (`cap` method in `go`):

```go
var mySlice []int = make([]int, 5, 10)
fmt.Println(len(mySlice)) // outputs 5
fmt.Println(cap(mySlice)) // outputs 10
```

Can also do with an array of strings:

```go
fruitArray := [5]string{"banana", "pear", "apple", "kumquat", "peach"}
splicedFruit := fruitArray[1:3]
fmt.Println(splicedFruit) // outputs [pear, apple]
```

### Slices

- if you append to an array past its capacity, `go` doubles the original array's capacity before appending

### Maps

- key, value pairs

```go
var userEmails map[int]string = make(map[int]string)
```

- unlike slices, we do not have to tell `make` the length

Also:

```go
userEmails := map[int]string{
    1: "user1@gmail.com",
    2: "user2@gmail.com"
}
```

To mutate, like JS:

```go
userEmails[1] = "user3@gmail.com"
```

`go` also provides a second return value of a boolean indicating whether there was something with that key:

```go
firstEmail, ok := userEmails[4]
fmt.Println(firstEmail, ok)
```

```go
if email, ok := userEmails[4]; ok {
    fmt.Println("email exists")
} else {
    fmt.Println("email doesn't exist")
}
```

- if `ok` is true, execute what is inside curly braces, if false, don't

**The method `delete()`**:

```go
delete(userEmails, 2)
```

### Complex Structures Exercise

### Complex Structures Solution

#### Part 1

1. Instantiate an array of scores
   - The array should have at least 5 elements of type `float64`
2. Write a function that calculates and returns the average score (also a float)
   - Use the `range` keyword

```go
package main

import (
	"fmt"
)

func average(numbers ...float64) float64 {
	total := 0.0
	for _, number := range numbers {
		total += number
	}
	return total / float64(len(numbers))
}

func main() {
	fmt.Println(average(10, 5, 7))
}
```

#### Part 2

1. Define a map that contains a set of pet names, and their corresponding animal type. i.e.: `"fido": "dog"`.
2. Write a function that takes a string argument and returns a boolean  indicating whether or not that key exists in your map of pets.

```go
package main

import "fmt"

var initialPets map[string]string = map[string]string {
    "fido": "dog",
    "penelope": "horse",
    "nancy": "cat",
}

func doesPetExist(petName string) bool {
    _, ok := initialPets[petName]
    return ok
}

func main() {
    pet := "spot"
	petExists := doesPetExist(pet)
	fmt.Println(petExists)
}
```

#### Part 3

1. Instantiate a slice that has an initial value of a collection of groceries.
2. Write a function that takes one or more groceries as strings and  appends them to the slice, printing out the resulting list of groceries.

```go
package main

import "fmt"

var initialGroceries = []string{"beans", "lemons", "chicken", "fruit"}

func addGroceryToList(newGroceries ...string) []string {
    foods := initialGroceries
    for _, g := range newGroceries {
        foods = append(foods, g)
    }
    
    return foods
}

func main() {
    groceryList := addGroceryToList("beets", "chocolate", "lime")
    fmt.Println(groceryList)
}
```

## Go Toolkit

### Tools & Commands

```
go run main.go

go install

go build

go fmt main.go

go list

go vet

go doc fmt.Println

go get golang.org/x/lint/golint

golint
```

`go list`: list out any packages we have established in our codebase

### Packages

- importing local packages:

  ```go
  package main
  
  import (
      "fmt"
      "fem-intro-to-go/05_toolkit/code/utils"
  )
  ```

- can also use an alias:

  ```go
  package main
  
  import (
      "fmt"
      math "fem-intro-to-go/05_toolkit/code/utils"
  )
  ```

- the only way to export functions is for them to start with a capital letter

### Testing

```go
package utils

import "testing"

func TestAverage(t *testing.T) {
    expected := 4
    actual := utils.average(1, 2, 3)
    
    if actual != expected {
        t.Errorf("Average was incorrect! Expected: %d, Actual: %d", expected, actual)
    }
}
```

### Unit Testing Exercise

## Structs

### Structs

```go
type User struct {
    ID int
    FirstName string
    LastName string
    Email string
}
```

Can also write:

```go
type User struct {
    ID int
    FirstName, LastName, Email string
}
```

Dot notation to access properties:

```go
var u User
u.ID
```

### Custom Types

### Accessing Nested Structs

### Modifying Struct Values Exercise

## Pointers

### Pointers

A **_pointer_** in Go is a variable that holds the **_memory location_** of that variable instead of a copy of its value.

```go
var name string
var namePointer *string

name = "Beyonce"
namePointer = &name
var nameValue = *namePointer
```

### Pass by Reference

```go
func changeName(n *string) {
	*n = strings.ToUpper(*n)
}

func main() {
	name := "Elvis"
	changeName(&name)
	fmt.Println(name)
}
```

- this produces output: `ELVIS`

```go
func changeName(n string) {
	n = strings.ToUpper(n)
}

func main() {
	name := "Elvis"
	changeName(name)
	fmt.Println(name)
}
```

- this fails to produce the output capitalizing all letters so output: `Elvis`

### Pointers Exercise

1. Define an instance of the User struct
2. Write a function called `updateEmail` that takes in a `*User` type
3. Update the user's email to something new
4. Call `updateEmail()` from `main()` and verify the updated email has persisted

```go
package main

import "fmt"

// User represents a user
type User struct {
	ID                         int
	FirstName, LastName, Email string
}

// Your code here

func updateEmail(u *User) {
	u.Email = "newemail@gmail.com"
}

func main() {
	fmt.Println("Pointers!")

	var u = User{
		1,
		"Austin",
		"Sandusky",
		"myaim@aim.com",
	}

	updateEmail(&u)

	fmt.Println(u)
}
```

## Error Handling

### Error Handling


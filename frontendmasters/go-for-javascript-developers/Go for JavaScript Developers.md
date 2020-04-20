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


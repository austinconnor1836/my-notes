# CSS Grids and Flexbox for Responsive Design



## CSS Grid

### Introducing CSS Grid

- there is no CSS Level 4...CSS the language no longer has levels.
  - https://www.w3.org/TR/css-2015/#css-levels

#### Why CSS Grid?

- Built into CSS specification (now a recommendation)
- all browsers support it
- adoption rates have taken off spectacularly
- No "row" markup required.
- Grid is designed to work in 2 dimensions.
- Use Flexbox for UI elements, but use Grid for major layout.

#### CSS Grid: Browser Compatibility

- full support in all the browsers you expect
- partial support on all of the Microsoft browsers
- No support for mostly mobile browsers
  - she says it does not matter if a mobile browser has CSS Grid or not since on mobile screens, items are stacked vertically

#### Polyfills & Fallbacks

#### Exploring CSS Grid Examples

Space between columns:

- just before column 1:

  ```css
  .col-1 {
      grid-column: 1 / 2;
  }
  ```



![css-grid-2](C:\Users\au3643\repos\my-notes\frontendmasters\CSS Grids and Flexbox for Responsive Web Design\images\css-grid-2.png)



#### Alternate Syntax

- Named grid template areas (header, footer, etc):
  https://gridbyexample.com/examples/#example11

#### Reordering

#### CSS Code Demo

Implicit Grid: when some grid values are provided but not complete, CSS grid implicitly helps by filling in



#### Chapter 11: CSS Grid Grid

```css
.wrapper {
    grid-gap: 2%;
    grid-template-rows: repeat(4, 1fr); /* 4 columns, 1 fraction */
    grid-template-columns: ;
}
```

`repeat(4, 1fr)`: after applying a `grid-gap: 2%`, whatever is left over, divide into 4 equal fractions.

#### Grid Properties Review

You can name your columns in `grid-template-columns/rows`:

- ```css
  grid-template-columns: [col1] 40px [col2] 3fr;
  grid-template-rows: 350px [name] 350px [name] 10%;
  ```

- `grid-gap`:

  - shorthand for `grid-column-gap` and `grid-row-gap`

- `grid-column: 1/3;` is also written as:

  - ```css
    grid-column-start: 1;
    grid-column-end: 3;
    ```


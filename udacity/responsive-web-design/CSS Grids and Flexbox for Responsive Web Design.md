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


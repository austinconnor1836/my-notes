# Design for Developers

## Layout

### Layout Tools

- Photoshop
  - effects
  - filters
  - shapes (more clumsy than Illustrator)
  - art boards
- Illustrator
  - creating an SVG
  - path points
  - creating things with a lot of gradients
  - shapes
- Sketch
  - took the world by storm (it is new)
  - good for working with multiple ideas at once
    - different views for desktop, mobile without consuming a lot of RAM
  - good at re-usable symbols (not good at exporting those symbols)
    - Illustrator is much better at exporting symbols
- None of these tools are wrong
- They will all get the job done, just depends on personal preference

### Photoshop Keyboard Shortcuts

- `v`: **Move tool**
  - move objects around
- `m`: **Marquee tool**
  - Create a selection
- `g`: **Paint bucket**
  - `Shift-g`: gradient
- `d`: **Default colors**
- `t`: **Text**
- `i`: **Eyedropper**



## CSS Layout

### Layout in CSS

https://gridbyexample.com

https://labs.jensimmons.com

http://cssgridgarden.com

#### Code Demos

![grid template areas](C:\Users\au3643\repos\my-notes\frontendmasters\Design for Developers\images\grid-template-areas.png)

```html
<section>
  <div class="item item-a"></div>
  <div class="item item-b"></div>
  <div class="item item-c"></div>
  <div class="item item-d"></div>
</section>
```

```css
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

section {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
  grid-template-areas: 
    "header header header header header"
    "main   main   main   .      sidebar"
    "footer footer footer footer footer";
  grid-template-rows: 80px auto 80px;
}


div {
  background: grey;
}
```



- `minmax()`: without using media queries, responsive design

### CSS Flexbox

https://css-tricks.com/snippets/css/a-guide-to-flexbox/

https://webanimationworkshops.com

- css property: `shape-outside: circle(40%)`
  - forms text around circular shape (not supported on firefox or edge)
    - just use `@supports` in css for firefox

### Using ClipPath & Other Masking Tools

- for SVG's, the `viewBox` property is like a window on a large piece of graph paper (the SVG)
  - `preserveAspectRatio` scales with the container/screen size
- SVGs are good for drawing since they are built with math
- you can also make clippaths using CSS:
  - https://bennettfeely.com/clippy
  - not well supported across browsers whereas SVGs are very well supported
- https://s.codepen.io/yoksel/debug/fsdbu/jVkpoyweDWyA
- <a href="https://github.com/chenglou/react-motion">react-motion</a>
- CSS writing-mode:
  - if you need to support Japanese, Hebrew, Chinese, etc.
  - `transforming` is supported everywhere, CSS writing-mode is not well supported
  - if you are actually using another language, CSS writing-mode is a must

### Grid By Example Demo


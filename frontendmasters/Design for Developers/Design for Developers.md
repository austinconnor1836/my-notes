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



## Color Theory

### Color Modes

Red, Yellow, and Blue are actually NOT primary colors. It depends on **color mixing**.

Two types of color mixing: <u>subtractive</u> and <u>additive</u>.

**Additive**: Red, Green, Blue

**Subtractive**: Magenta, Cyan, Yellow

![color modes](C:\Users\au3643\repos\my-notes\frontendmasters\Design for Developers\images\color-modes.png)

- **K**: black

### Color Mixing

**A color is only a color in relation to another color.**

**Contrast** is an important piece of this.

- check the contrast for accessibility
- **Contrast-A** program helps with this

#### Types of Combinations

- **Monochromatic**: one color
- **Analogous**: colors that are near each other on the color wheel
- **Split**
- **Triad**
- **Complementary**
- **Tetriadic**

https://color.adobe.com

It is important to have accents within your color palette so you can draw people's attention to things.

https://smashingmagazine.com/2010/02/color-theory-for-designer-part-3-creating-your-own-color-palettes/

### Color Modes and Properties

**Monotone**: one single tone you are making for the entire image

**Duotone**: (Spotify ads)

In real life, if light is shined on a something, its shadow is the opposite color.

Things far away from you are going to have low contrast and are more blurry. Things closer to you have high contrast and sharper in resolution.

### Color in Code

#### RGB and RGBA

`x` is a number from 0-255

`y` is a number from 0.0 to 1.0 (*alpha* or *opacity*)

`rgb(x, x, x);` or `rgba(x, x, x, y);`

Example: `rgba(150, 150, 150, 0.5);`

- Sarah said `rgb` is not her favorite

#### Hex

The values use ranges from 0-9 and A-F.

0 being the lowest value and F being the highest or `#00000` being black and `#FFFFFF` being white.

- Most common, least human-readable

![hex color](C:\Users\au3643\repos\my-notes\frontendmasters\Design for Developers\images\hex-color.png)

#### HSL(A)

- Sarah's favorite
- It is human readable
- **HSLA**:
  - **H**ue
  - **S**aturation
  - **L**ightness
- Great for if you need to reduce the saturation of a color, etc.
- `x` is a number from 0 - 360
- `y` is a percentage from 0% to 100%
- `z` is a number from 0.0 to 1.0
- `hsl(x, y, y);` or `hsla(x, y, y, z);`
- Example: `hsla(150, 50%, 50%, 0.5);`

![hsla](C:\Users\au3643\repos\my-notes\frontendmasters\Design for Developers\images\hsla.png)

There is a new color format that will be coming out in a few years that is much more sophisticated (think CSS Grid for Color formatting):

- Chris Lilly gave a talk on it in Singapore (he created SVG)

#### Named colors

- It is useful for giving demos, and that is pretty much it

### Color Variables

- Why use them? **They can keep things consistent across the project.**
- Highly recommended as it saves a ton of time when you need to update the colors of a site.

Native CSS Variables

```css
:root {
    --brandColor: red;
}
body {
    background: var(--brandColor);
}
```

Sass/SCSS

```scss
$brandColor: red;

body {
    background: $brandColor;
}
```

- you can do color mixing directly in Sass

Sass/SCSS

```scss
mix($color1, $color2, [$weight])
adjust-hue($color, $degrees)
lighten($color, $amount)
darken($color, $amount)
saturate($color, $amount)
```

- for if you want to work with color programmatically

### Limited Color

- when you are first starting out, Sarah says you should limit your color palettes as much as possible as it will keep it consistent and cohesive and you can add more detail as you go

![limited color](C:\Users\au3643\repos\my-notes\frontendmasters\Design for Developers\images\limited-color.png)

- Justin Mezzell

- Example of limited color: uixNinja

### Color Tools

- Dribbble
  - Steal Palettes
  - Search by color
    - for a lot of us, we do not get to choose our brand color.
- Coolors, https://coolors.co
  - Sarah uses this for side projects (usually since projects already have base colors)
  - generates color palettes that we probably would not be able to come up with on our own
- Paletton, https://paletton.com
  - allows you to build a palette based on the proportion of colors you would like
- Kuler/Color CC, https://color.adobe.com
- Palettetab, 
  - for new tabs, you can see a new color palette with new fonts
- Adobe Capture
  - analyze a photo with machine learning to determine a color palette
- CSS Gradient
  - Ultimate CSS Gradient Generator
    - old but reliable
    - it's not great for finding a gradient, but if you already have two colors, it is really good at outputting a CSS gradient incorporating them
- Gradient
  - ui Gradient

### Animated Gradient

- if you need to animate gradients, don't just animate them!
- https://codepen.io/sdras/pen/akAWPR/
  - how to properly animate
  - it does cause any layout triggers, it is really performant

### How to Create a Palette

Anchoring: anchor a color palette to one color

- you can find more fresh, energetic to corporate, serious colors to create your palette
- Gather Accents
  - find a nice accent to anchor

### Data Visualization with HSL(A) Example

### Creating a Palette Demo

- let us say we are starting with an image
- you can build out your color palette from your image on your home page
- https://unsplash.com






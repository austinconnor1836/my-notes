# 005 - Media Queries

## Media Type, Screen Size & Resolution

### 10 Media Queries (2.1)

1. all
2. aural (spoken)
3. handheld
4. braille
5. embossed
6. print
7. projection
8. screen
9. tty
10. tv

### Media Queries

```css
@media screen and (max-width: 600px) {
  #presentation {
    background: red;
  }
}
@media screen and (orientation: portrait) {
  #presentation {
    background: yellow;
  }
```

```css
@media screen and (orientation: landscape) {
  a[href^="mailto:"]:before {
    content: url(icons/email.gif);
  }
}
```

You can link the media queries directly in your link in your HTML file:

```html
<link rel='stylesheet'
media='screen and (min-width: 320px) and (max-width: 480px)'
href='css/smartphone.css' />
```

### Breakpoints

- don't think about devices, think about **what looks good for your design**

- Estelle, for example, does `p { max-width: 60 em; }`, where the paragraphs do not exceed 60 characters.

### media query properties

- generally you want to use `min/max` for `width`, `height`, and `aspect-ratio`
- there is a difference between **squishy** and **responsive** web design, most of us do squishy web design

### Resolution Units

- `dpi`: dots per inch (72, 96)
- `dpcm`: dots per centimeter (1dpcm approx = 2.54 dpi)
- `dppx`: dots per pixel
  - 1 dppx = 96 dpi (default resolution of images)

This is for if you want to serve a high resolution image.

### Syntax & Punctuation

- "only" leaves out older browsers (old printer)
  - `media="only" print and (color)"`
- "and" - both parts must be true
  - `media="only screen and (orientation: portrait)"`
- "not" - if untrue
  - `media="not screen and (color)"`
- Comma separates selectors - any part can be true
  - `media="print, screen and (min-width: 480px)"`

### Browser Capability `@supports`

- `@supports`

  - ```css
    @supports (display: flex) {
        /* rules for browsers supporting unprefixed flex box */
    }
    ```

- Don't use

  - ```css
    @media screen and (transform-3d) {
        .transforms {}
    }
    ```

  - ```css
    @media screen and (min-width: 320px) and (max-width: 500px) {
        @-ms-viewport { width: device-width; }
    }
    ```

- this is useful for browser detection

### Viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
```

- **_<u>This is so important it should be default in all of your code!</u>_**

```css
@viewport {
    width: device-width; zoom: 0.5;
}
```

- the only use case for having `zoom: 1;` would be for mobile games as you don't want to zoom and have part of the screen off-screen.

#### Viewport Sidenote

If `<meta>` is set to disable zoom ,there is no delay on onClick events.

If `<meta>` is set to disable zoom, you're a jerk!

#### Use Cases

##### Relative width

```css
@media screen and (min-width: 38em) {
    #content { padding: 0 21%; }
}
```

- if it is a big screen, we want a lot of white space
- if it is a small scree, we do not want a lot of white space

### Use Cases: Hyphenations

#### CSS Hyphenations, `<WBR>` and `&Shy;`

`<WBR>`: it is HTML element, it is a word break, can place it anywhere you want

`&Shy;`: an optional dash, if it is the end of the word put a dash, if it is not, don't

In CSS:

```css
@media screen and (min-width: 38em) {
    #content { padding: 0 21%; }
}
p {
    hyphens: auto;
}
```

Without the `hyphens: auto;` for the `<p>` elements, on small screens and large screens, words will not have great looking hyphenation.

### Columns

```css
column-count: 1;
column-width: 10em;
column-rule: 1px solid #bbb;
column-gap: 2em;
```

- if `column-count: 6;`, it will only produce 2 columns because each column is at least `10 em`.

#### Use Cases: SVG

```css
:root {
    background-image: url(circle.svg);
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: 70%;
}
```
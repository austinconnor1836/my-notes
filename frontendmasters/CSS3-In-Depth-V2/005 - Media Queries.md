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
- there is a difference between squishy and responsive web design, most of us do squishy web design

### Resolution Units



## Screen Resolution



## <s>Device Capability </s>



## Browser Capability


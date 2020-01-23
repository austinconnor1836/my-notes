# 006 - Colors & Appearance

### Colors: RGB, HSL & HEX

All these colors are `white`:

```css
color: white;
color: #fff;
color: #FFFFFF;
color: #FFFFFFFF; /* last two 'FF's means 100% opaque or 1 */
color: rgb(255,255,255);
color: rgb(100%,100%,100%);
color: rgba(255,255,255,1);
color: rgba(100%,100%,100%,1);
color: hsl(0, 100%, 100%);
color: hsla(0, 100%, 100%, 1);
color: transparent;
color: currentColor; /* currentColor is the current color of the text */
```

- `rgba`'s format is `(red, green, blue, alpha)`
- `hsla`'s format is `(hue, saturation, transparency, alpha)`
- Estelle's color converter: http://www.standardista.com/hsla-color-picker/
  - displays equivalent code for each `hsla`, `rgb` and `hex`

#### Color Tips

- transparent == `rgba(0, 0, 0, 0);`
- CurrentColor == current Text color
- 10% of all men are color blind
- Accessibility: Color should not be the only means to convey meaning

### Opacity vs. Alpha Transparency

Alpha Transparency is changing the color where the color is not fully opaque using some foreground color

`opacity`: whole element is becoming transparent

`AlphaTransparency`: the element remains the same color but the `color` becomes transparent

![alpha transparency](/home/aconnor/repos/my-notes/frontendmasters/CSS3-In-Depth-V2/images/alphatransparency-tips.png)

### Appearance

Estelle shows that buttons, scrollbars, audio control are stylable elements. Then Estelle looks at how the browser defines appearance, and how to discover how to control it.

If you use the correct html element, tabbing and using the keyboard works great for you.

If you use the wrong element, you have to use JavaScript to maintain its state.

We have virtual DOMs mainly because people don't know how to use the actual DOM.

#### -moz-appearance

#### -webkit-appearance

#### -webkit-appearance: media values




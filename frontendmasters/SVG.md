# SVG!

## SVG Anatomy Overview

1. Crisp on any display
2. Less HTTP requests to handle
3. Easily scalable for responsive
4. Small filesize if you design for performance
5. Easy to animate
6. Easy to make accessible
7. Fun!



**Images take up over 50% of HTTP requests with videos taking up roughly 25%**

"You can't be a web performance expert without being an image expert." - @tobint



### Loaders!

File size: 6 kB! (after optimization)



### Overview of the SVG DOM

- Platonic Shapes
- Viewbox
- PreserveAspectRatio
- Grouping
- Drawing Paths
- SVG on Export



#### Platonic Shapes

(squares, circle, star, line, diagonal line)



#### Viewbox and Responsive

Viewbox:

- acts like graph paper

- ```css
  svg { width: 450px; }
  ```

  - sets the graph paper viewBox to a width of 450px so things can get clipped if they are outside or partially outside the viewBox



#### PreserveAspectRatio

**Meet (Default)**:

- entire viewBox is visible within viewport
- the viewBox is scaled up as much as possible, meeting other criteria
- viewBox < viewport

**Slice**:

- entire viewport is covered by the viewBox
- the viewBox is scaled down as much as possible, meeting other criteria
- viewBox > viewport

**None**:

- removes constraint
- Sarah's favorite
- not great for things like faces
- good for things like layouts
  - a good example is webanimationworkshops.com
  - the pointed triangle adjusts to width of viewport/screen



### Paths and Groups

#### Paths

- closed path, add a `z` at the end
- open path, do not
- Upper case path letter: position is absolute
- Lower case path letter: position is relative

- **Paths: Curve Commands**



#### Group:

- apply things to everything inside group:

  - ```html
    <g fill="none" stroke="#000">
      ...
    </g>
    ```



#### Polyline

```html
<polyline points="14,17 136,37 77,117 230,87 132,158 172, 158" />
```



### Animated Bezier Curves



### Accessibility

```html
<svg aria-labelledby="title"
  id="svg"
  role="presentation"
  xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 765 587"></svg>
<title id="title"
  lang="en">
  Icons that illustrate Global Warming Solutions
</title>
```

- title for elements in the SVG DOM
- Role to let the screen reader know whether to traverse



## CSS Animation

### Optimizing & Building

- too many path points can impede performance
- 










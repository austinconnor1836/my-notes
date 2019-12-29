# CSS Grids and Flexbox for Responsive Web Design

### Floats

- originally intended to float an image in a certain direction (left or right)
- Why floats?
  - You have to understand the industry standard.
  - You have to understand floats to understand Flexbox.
- A hack from the start, right after table-based layout!
- **Features rows and cells**
- Rows clear the floats on the cells
  - **"If you float, you must clear"**
- Floats appear according to the ordering in the HTML
- **Major disadvantage: equal column heights**
- **<u>Two components for a float-based layout:</u>**
  - the row
  - the individual cells
    - contains a width, a float, and often a margin



![basic float example](/home/austin/repos/my-notes/frontendmasters/CSS Grids and Flexbox for Responsive Web Design/images/floats-basic.png)

```html
<div class="row">
    <div class="col-1"></div>
    <div class="col-1"></div>
    <div class="col-1"></div>
    <div class="col-1"></div>
</div>
```

```css
.row::after {
    content: "";
    display: table;
    clear: both;
}
.col-1 {
    float: left;
    margin-left: 4%;
    width: 20%;
}
[class*='col-'] {
    width: 92%; /* This is used since there is 4% margin on left and right */
    margin-left: 4%;
    margin-right: 4%;
    min-height: 1px;
}
```

- There can be layout problems with floats. This can be resolved with JavaScript, with a column equalizer script.

- ```css
  /* rearranging the columns */
  [class*="col-"] {       /* this is called an attribute selector */
      position: relative; /* for any HTML element with an attribute of class */
  }                       /* with a value containing 'col-' */
  .col-push-1 {
      left: 26%;
  }
  .col-pull-3 {
      left: -74%;
  }
  ```

### CSS Floats Exercise

- Create a 4-column floated grid with given starting files
- Include 2 breakpoints (your choice for where) and 3 layouts ("desktop", "tablet", "phone")
- IF YOU HAVE EXTRA TIME:
  - Consider how to equalize the columns so they wrap without breaking
  - Consider reordering of Row 3 at tablet and phone sizes

- to get the total width, you have to add up **the margin, the padding, the border, and the content in the middle**
- `*` selector: selects everything

```css

/* Mobile Landscape Screen Sizes */
@media only screen and (min-width: 480px) {
    [class*='col-'] {
        margin-right: 0;
        min-height: 1px;
        float: left;
    }
    .col-1-2,
    .col-2 {
        width: 44%;
    }
    .col-1-4,
    .col-3,
    .col-4 {
        width: 92%;
    }
}

/* Desktop screen sizes */
@media only screen and (min-width: 768px) {
    .col-1-2,
    .col-1-4 {
        width: 20%;
    }
    .col-2 {
        width: 44%;
    }
    .col-3 {
        width: 68%;
    }
    .col-4 {
        width: 92%;
    }
}
```


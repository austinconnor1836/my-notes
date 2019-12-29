# CSS Grids and Flexbox for Responsive Web Design

### Floats

- originally intended to float an image in a certain direction (left or right)
- A hack from the start, right after table-based layout!
- **Features rows and cells**
- Rows clear the floats on the cells
  - **"If you float, you must clear"**
- Floats appear according to the ordering in the HTML
- **Major disadvantage: equal column heights**



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

- 
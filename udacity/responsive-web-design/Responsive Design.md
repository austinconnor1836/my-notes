Responsive design is an **art** rather than a **science**.



The **viewport** defines the area of the screen that the browser can render content to.

- Devices have different pixel density
- **A pixel isn’t always a pixel**



The browser reports the number of **DIPS (Device Independent Pixels)** instead of the number of hardware pixels.

- Relates pixels to real distance
- Take up the same amount of space on a display regardless of the pixel density of the display



Unless you explicitly tell the browser the application was designed for small displays, it assumes that they weren’t.



**Setting the viewport**

![img](https://lh4.googleusercontent.com/E4jX7VhijqW_91iKCg1QUcz3WRq780kmF48E54SYnh1ZQsWk3poeb8QF4ExDaPdVpXqJhCaD8iStmLbbnkhYdAsxfIFtgNlXJR4OrkIA1zWf0bsdqqIi7cNxukMoYKAVfafzaH1M)

- width = device-width matches the device’s screen width in DIPS
- initial-scale=1 sets a one to one relationship between DIPS and CSS pixels.



**Use** **relative widths** **instead of absolute fixed widths**.

Set max-width in css to avoid image/content overflow:

![img](https://lh6.googleusercontent.com/Fn0wizrxLJDblZBxV7rSB4RXHc3gB17U35uU_o_OlzhJsPTbgtixqVEo6bidffraVHbGRRvy2dpB3tssZfp9nuuEl1b3iz2jhknxQO5P-sTNs64L_dT-Edug1GrAPFregFMGzloB)

- max-width overrides width in css





**Tap Target Sizes**

- Our fingers are about 10mm (0.5 inch) wide, or **40 CSS pixels**.
- Make Tap Targets about **48px by 48px**, to leave space between so as to not accidentally tap undesired targets
- Use min-height: 48px; and min-width: 48px; as height and width can sometimes prevent the element to resize if the content inside of it is bigger than the container.









**Start small**

- Start developing with the smallest form factor

- - Prioritized information is always included

- Then, develop for larger screens

- Eventually, there won’t be a wider screen

- Performance matters



**Flexbox Intro**:

**Flexbox Container**

```html
<style type="text/css">
    .container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
</style>
<body>
    <div class="container">
        <div class="box dark_blue"></div>
        <div class="box light_blue"></div>
        <div class="box green"></div>
    </div>
</body>
```

- `flex-wrap: wrap` allows flex items inside the container to wrap onto a new line when the browser's width is reduced.

`flex order`:

```css
@media screen and (min-width: 700px) {
    .dark_blue { order: 4; }
    .light_blue { order: 5; }
    .green { order: 2; }
    .orange { order: 3; }
    .red { order: 1; }
}
```

- when the screen width is greater than `700px`, the order of the items changes to what is specified in the media query
- **`order` starts at `0`**



### Intro to Patterns

**Responsive Patterns**

Most patterns used by responsive web pages can be categorized into 4 groups:

- **Mostly Fluid**
- **Column Drop**
- **Layout Shifter**
- **Off Canvas**



**Column Drop**:
![image-20191219094706572](C:\Users\au3643\AppData\Roaming\Typora\typora-user-images\image-20191219094706572.png)

- go from multiple rows to smaller number of rows after hitting each breakpoint

```html
<div class="container">
        <div class="box dark_blue"></div>
        <div class="box light_blue"></div>
        <div class="box green"></div>
</div>
```

```css
.container {
    display: flex;
    flex-wrap: wrap;
}

.box {
    width: 100%;
}
```

- we picked an arbitrary width to place a breakpoint at `450px`
  - we want the `dark_blue` to be **25%**
  - `light_blue` to be **75%**
  - `green` to be **100%**

```css
@media screen and (min-width: 450px) {
    .dark_blue {
        width: 25%;
    }
    
    .light_blue {
        width: 75%;
    }
}
```

- set another breakpoint at `550px`
  - `dark_blue` = **25%**
  - `light_blue` = **50%**
  - `green` = **25%**

```css
@media screen and (min-width: 550px) {
    .dark_blue, .green {
        width: 25%;
    }
    
    .light_blue {
        width: 50%;
    }
}
```



**Pattern: Mostly Fluid**

- similar to Column Drop, more grid-like though

![image-20191219105304837](C:\Users\au3643\AppData\Roaming\Typora\typora-user-images\image-20191219105304837.png)

- margins are added on the left and right instead of expanding out

At narrowest viewport:

```css
.container {
    display: flex;
    flex-wrap: wrap;
}

.box {
    width: 100%;
}
```

At first breakpoint at `450px`:

```css
@media screen and (min-width: 450px) {
    .light_blue, .green {
        width: 50%;
    }
}
```

At second breakpoint at `550px`:

```css
@media screen and (min-width: 550px) {
    .dark_blue, .light_blue {
        width: 50%;
    }
    
    .green, .red, .orange {
        width: 33.333333%;
    }
}
```

At third breakpoint at `700px`:

```css
@media screen and (min-width: 700px) {
    .container {
        width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
}
```



**Pattern: Layout Shifter**:

- probably the most responsive pattern

![image-20191219110814662](C:\Users\au3643\AppData\Roaming\Typora\typora-user-images\image-20191219110814662.png)

```html
<div class="container">
    <div class="box dark_blue"></div>
    <div class="container" id="container2">
        <div class="box light_blue"></div>
        <div class="box green"></div>
    </div>
</div>
```

```css
.container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.box {
    width: 100%
}
```

First breakpoint:

```css
@media screen and (min-width: 500px) {
    .dark_blue {
        width: 50%;
    }
    
    #container2 {
        width: 50%;
    }
}
```

Second breakpoint:

```css
@media screen and (min-width: 600px) {
    .dark_blue {
        width: 25%;
        order: 1; // to get it to show up last
                  // requires any # > 0
    }
    
    #container2 {
        width: 50%;
    }
    
    .red {
        width: 25%;
        order: -1; // sets it first before all
    }
}
```


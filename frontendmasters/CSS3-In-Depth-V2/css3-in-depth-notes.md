## Table of Contents
- [Part 1](#part-1)
  * [Basic selectors, relational selectors](#basic-selectors-relational-selectors)
  * [Attribute selectors](#attribute-selectors)
  * [UI Pseudo-classes](#ui-pseudo-classes)
  * [Structural UI Pseudo-classes](#structural-ui-pseudo-classes)
  * [Demonstration of Structural UI Pseudo-classes](#demonstration-of-structural-ui-pseudo-classes)
  * [Negation and empty pseudo-classes](#negation-and-empty-pseudo-classes)
  * [Other Pseudo-classes](#other-pseudo-classes)
  * [Pseudo-elements](#pseudo-elements)

#### CSS Writing Tool

- Font Squirrel

## ## Selectors

### Basic Selectors & CSS Levels

3 basic selectors:

- `#myID`: ID
  - can target with CSS and Javascript
  - Estelle likes targeting ID with Javascript
- `.myClass`: class
- `li`: tag name

You always want to target at the lowest specificity.

#### Selectors in CSS Level 1

- E (element)
- `.class`
- `#id`
- `E F`
- `:link`
- `:active`

#### CSS Level 2 Selectors

- `*`: all
- `E > F`: direct descendant
- `E + F`: adjacent sibling (the element that comes immediately after it)
- `E[attribute]`
- `E[attribute=value]`
- `E[attribute~=value]`
- `E[attribute|=value]`
- `:first-child`
- `:lang(en)`
- `:focus`
- `:hover`
- `:visited`
- `:before`
- `:after`
- `:first-letter`
- `:first-line`

#### CSS Level 3 Selectors



#### In UI Specification (Not CSS Selectors Level 3)



Order of CSS:

1. CSS Level 1
2. CSS Level 2
3. CSS Level 2.1

CSS 3 were actually broken up into modules

There was never going to be a CSS Level 4 since it was modularized

### Specificity Information

#### Specifity: How it works

- lowest weight is on the right and the largest weight is on the left
- `0-0-24` is less specific than `0-1-0`
- `1-0-0`: ID Selector
- `0-1-0`: Class selector (Also attribute selector & pseudoclass)
- `0-0-1`: Element Selector
- There is specificity and cascading

### Relational Selectors & Combinators

```css
ul li,
ol li
```

<ol>
    <li style="background-color: grey;">item 1</li>
    <li style="background-color: grey;">item 2</li>
    <li style="background-color: grey;">item 3
        <ul>
            <li style="background-color: #708090;">item a</li>
            <li style="background-color: #708090;">item b</li>
            <li style="background-color: #708090;">item c</li>
        </ul>
    </li>
    <li style="background-color: grey;">hasaclass</li>
    <li style="background-color: grey;">item 5</li>
    <li style="background-color: grey;">item 6</li>
    <li style="background-color: grey;">item 7</li>
</ol>

```css
ol > li
```

<ol>
    <li style="background-color: grey;">item 1</li>
    <li style="background-color: grey;">item 2</li>
    <li style="background-color: grey;">item 3
        <ul>
            <li style="background-color: dark-grey;">item a</li>
            <li style="background-color: grey;">item b</li>
            <li style="background-color: grey;">item c</li>
        </ul>
    </li>
    <li style="background-color: grey;">hasaclass</li>
    <li style="background-color: grey;">item 5</li>
    <li style="background-color: grey;">item 6</li>
    <li style="background-color: grey;">item 7</li>
</ol>

```css
li.hasaclass + li
```

<ol>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3
        <ul>
            <li>item a</li>
            <li>item b</li>
            <li>item c</li>
        </ul>
    </li>
    <li>hasaclass</li>
    <li style="background-color: grey;">item 5</li>
    <li>item 6</li>
    <li>item 7</li>
</ol>

```css
li.hasaclass ~ li
```

<ol>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3
        <ul>
            <li>item a</li>
            <li>item b</li>
            <li>item c</li>
        </ul>
    </li>
    <li>hasaclass</li>
    <li style="background-color: grey;">item 5</li>
    <li style="background-color: grey;">item 6</li>
    <li style="background-color: grey;">item 7</li>
</ol>

#### Selectors API

In JavaScript:

```javascript
var chil = $('#bar .foo');
```



##### Natively

```javascript
var el = document.querySelector('#bar');
var chil = el.querySelectorAll('.foo');
```

or

```javascript
chil = document.querySelectorAll('#bar .foo');
```

- find me the elements with an ID of `bar` and descendant with a class of `foo`

### Attribute Selectors

- You always want an `alt` attribute on an `img`

#### Attribute Selectors in CSS 2

`E[attr]`

- Element E that has the attribute attr with any value.

`E[attr="val"]`

- Element E that has the attribute attr with the exact, case-sensitive if attribute is case-sensitive, value *val*.

`E[attr|=val]`

- Element E whose attribute *attr* has a value *val* or begins with val- ("val" plus "-")

#### Attribute Selectors in CSS Selectors Level 3

`E[attr^=val]`

- Element E whose attribute *attr* starts with the val *val*

- **2 good examples:**
  `a[href^=mailto] {background-image: url(emailicon.gif);}`

  - progressive enhancement

  `a[href=^http]:after {content: " (" attr(href) ")";}`

  - this would add the URL to any external links

`E[attr$=val]`

- Element E whose attribute *attr* ends in *val*.

  `a[href$=pdf] {background-image: url(pdficon.gif);}`

  - find every link that ends with PDF and put the icon on it
  - another progressive enhancement

`E[attr*=val]`

- Element E whose attribute *attr* has *val* anywhere in the string



#### Attribute Selectors 4: Case Insensitivity

`E[foo="bar" i]`

`input[type=checkbox i]`

Only relevant if attribute value is case sensitive (HTML elements are not case sensitive)

### Attribute Selectors Recap

`abbr[title|=en] {}`: targets anything with value *en* followed by a dash `-`

`a[href^=mailto] {}`: starts with

`a[href$=pdf] {}`: ends with

`abbr[title*=unicorn] {}`: anywhere inside

`abbr[title*=UNICORN i] {}`: case insensitive

### UI Pseudo-classes

#### User Interface Selectors

`+`: immediately after

```css
input[type=checkbox]:checked + label {
    color: red;
}
```

- any label that comes immediately after a checked input of type `checkbox`

Based on current state of UI:

- `:enabled`
- `:disabled`
- `:checked`
- `:indeterminate (Level 4)`

#### Form related UI pseudo-classes

```css
:default
:valid
:invalid

:required
:optional

:in-range
:out-of-range

:read-only
:read-write

:placeholder-shown

:user-error or :user-invalid
```

`input:valid { border: 1px solid green; }`

- if the input is valid, it has a border that is green

### Structural Selectors

```css
:root
:empty
:blank
:nth-child()
:nth-last-child()
:first-child*
:last-child
:only-child
:nth-of-type()
:nth-last-of-type()
:first-of-type
:last-of-type
:only-of-type
```

- target elements on the page based on their relationships to other elements in the DOM



```css
body :last-child
```

- matches the last child

```css
body :last-of-type
```

- matches the last of any type within each div

```css
body .foo:last-child
```

- matches the last child of its parent and also has a class of `foo`

```css
body p.foo:last-child
```

- matches the last paragraph of its parent that also has a class of `foo`

```css
body :only-of-type
```

- matches elements that only have one instantiation inside its parent

```css
body :only-child
```

- matches elements that are the only child of its parent

### nth-of-type Structural Selectors

```css
:nth-child(3n)
:nth-last-child(odd)
:nth-of-type(5)
:nth-last-of-type(3n+1)
```

General solutions:

```css
:nth-of-type(even)
:nth-of-type(odd)
:nth-of-type(an+b)
```

### Flag with Structural Selectors

```css
td {color: #fff; background-color: #fff;}
tr:nth-of-type(odd) td:nth-of-type(8) ~ td,
tr:nth-of-type(2n+9) td {
	background-color: #900; color: #900;
}
tr:nth-last-of-type(n+7) td:nth-last-of-type(n+9) {
	background-color: #009;
	font-size: 0;
	color: #009;
}
tr:nth-last-of-type(n+7) td:nth-last-of-type(n+9):after {
	content: '\2605';
	font-size: 15px;
	color: white;
}
tr:nth-last-of-type(2n+7) td:after {
	position: relative; left: 14px;
}
	}
```

```htm
<table cellpadding="0" border="0">
    <tbody><tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
      <tr><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td></tr>
    </tbody>
  </table>
```

### Root, Empty & Blank

```css
:root
```

- matches the `root` element, which is `<html>`

#### :empty & :blank pseudo-classes

```css
E:empty
```

- elements that are self-closing, are empty elements, like an image or an input

- element with no content inside is also empty

- only a comment is also empty

- if only has whitespace, it is blank, not empty and it is not supported

- ```htm
  <E/>
  <E></E>
  <E><!-- this is a comment --></E>
  <E title="this is an empty element"/>
  ```

```css
E:blank
```

```html
<E>  <!-- only has whitespace -->  </E>
```

### Negation, Matching & Parent

#### :not - Negation pseudo-class

```css
E:not(s1)
```

- matches any element that is not also matched by `s1`

  - `s1` is a simple selector (no combinators)

- ```css
  div:not(.excludeMe)
  ```

- supported for a long time, since IE 9

#### :matches(s1, s2)

- we don't have this yet (is active in Safari)
- works well for long class names and many of them

```css
li:matches([title], [role]) a {}
```

- equivalent to:

  ```css
  li[title] a,
  li[role] a {}
  ```

```css
:matches(#home, #contact) aside :matches(a:active, a:focus) {}
```

- equivalent to:

  ```css
  #home aside a:active,
  #contact aside a:active,
  #home aside a:focus,
  #contact aside a:focus {}
  ```

#### Experimental :any

- similar to `:matches`

- Chrome and Android:

  ```css
  :-webkit-any(article, aside) :-webkit-any(article, aside) h1,
  :-moz-any(article, aside) :-moz-any(article, aside) h1 {
  }
  ```

  - equivalent to:

    ```css
    nav a:not(:matches(.foo, .bar, .bam)),
    nav a:not(:-webkit-any(.foo, .bar, .bam)),
    nav a:not(:-moz-any(.foo, .bar, .bam)),
    nav a:not(.foo, .bar, .bam) {
    }
    nav a:not(.foo):not(.bar).not(.bam){
    }
    ```

#### Parent Selector

- **not supported in any browser currently**

Contains a header:

```css
header:has(h1, h2, h3, h4, h5, h6)
```

Contains no headers:

```css
header:not(:has(h1, h2, h3, h4, h5, h6))
```

Contains something that is not a header:

```css
header:has(:not(h1, h2, h3, h4, h5, h6))
```

### Linguistic Pseudo classes

CSS 2.1:

```css
html[lang|="en"]
```

- matches `en en-us en-uk`

```css
p:lang(en)
```

- specifies this particular paragraph is in English
- language of this document is English at this time and place

CSS Selectors Level 4

```css
:lang(*-ch)
```

- matches any chinese language (like UK English)

```css
:dir(ltr|rtl)
```

- left to right, right to left

### Link, Location, and User Actions

`:any-link` is the same as `:matches(:link, :visited)`

`a` with an `href` attribute:

```css
:link
:visited
```

#### User Action Pseudo Classes

```css
:hover
:active
:focus
```

- **always do `active` and `focus` together**

#### :hover, :active, :focus

```css
a:visited:hover
button:active:focus
```

**Never, ever, ever do...**

```css
*:focus { outline: none; }
```

- someone could see what color the link is to see if they have a Wells Fargo account

#### Drag and Drop Pseudo Classes

- `:drop`
  - drop targets while the user is "dragging". Unfortunately, `dropzone` attribute is not yet supported
- `:drop(active)`
  - current drop target for the drag operation.
- `:drop(valid)`
  - drop target is valid for the object currently being dragged, like correct filetype.
- `:drop(invalid)`
  - drop target is invalid for the object currently being dragged, i.e...

### Other Pseudo Classes

#### :target

```css
:target
```
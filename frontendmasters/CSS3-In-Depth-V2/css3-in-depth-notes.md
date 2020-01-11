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
- 
# Accessibility in JavaScript Applications

http://bit.ly/microsoft-inclusive-toolkit

### What we'll cover

- Accessibility debugging
- Accessibility in JavaScript apps
  - Focus management
  - Announcements
  - Semantic HTML
  - Unobtrusive motion
  - Progressive enhancement
- Accessibility units
- Accessible pages
- Q & A

### An app for today

- Built with Gatsby and React
- Server and client-rendered
- Outputs HTML pages by default
- Includes this slide deck

## Debugging Accessibility

### Steps for Debugging Accessibility

#### #A11y debugging

- Render in a web browser
- Test controls with the keyboard
- Use accessibility web extensions
- Check color contrast
- Test with screen readers
- Use magnification & zoom

### Hidden vs Visible CSS Rules

- `display: none`:
  - does not render on the DOM or for Accessibility
- `visibility: hidden;`:
  - reserves the space but does not show the Accessibility information

### Accessibility Tree

- it is a parallel structure to the DOM
- uses platform Accessibility APIs to communicate page structure and content to assistive technologies
  - different APIs based on OS: Windows, Mac, etc.
- `chrome://accessibility`

### Currently Focused Element

- **to tell you what is currently focused**:

  ```javas
  document.body.addEventListener('focusin', (event) => {
  console.log(document.activeElement)
  })
  ```

  - copy and paste this into the browser console to see what is currently focused

### Accessibility Debugging: Practice Problems

- For Contrast Ratio: `AA` and `AAA` are standards
  - NoCoffee is great for analyzing the contrast ratio in browser

#### Exercise 4: Screen reader testing

- OSX Voiceover and Safari
- NVDA and Firefox Windows
- JAWS and IE11 or Edge
- iOS Voiceover and Safari
- Android Accessibility and Chrome
- Orca on Linux

#### Magnification for users with low vision

- Browser zoom (all the way: 500%!)
- OS-level zoom
- ZoomText & other assistive tech

#### Exercise 5 Test with magnification

Things to watch out for:

- Page scrolling
- Font sizes & scaling
- UX of interactions when zoomed

Celebrate companies that do well on their websites

## Focus Management

### Focus Management & tabindex

#### Intro to Accessibility in JavaScript Applications

- Focus management
- Live Region announcements
- Semantic HTML
- Unobtrusive motion
- Progressive enhancement

#### Focus management

*Moving the user's focus as part of an interaction to alert them to new content*

*Also: handling focus in disabled and mutated parts of the page*

#### Focus management: building blocks

- Reachable and operable elements
- TAB, escape, and arrow keys
- Visible focus styles
  - can be a game-changer for using an interface for users with disabilities
- Hidden/inert content
  - if we are opening a layer on the screen, we are sure to disable the background

#### tabindex in HTML

Make non-interactive elements focusable

```html
tabIndex="0"      // in the tab order. see following slides
tabIndex="-1"     // focusable by script, or removes from tab order
tabIndex="99641"  // all up in your tab order. hard to manage
```

- if you use any positive number, it will come before anything in the natural order

**_Screen readers go beyond the TAB key_**

#### tabindex + role + name

Expose accessibility information for focusable elements

```html
<div tabIndex="0"          // focusable
     role="button"         // a button widget, not a DIV
     aria-label="Close"    // an accessible name
</div>
```

**_Intended for custom interactive elements, not wrapper DIVs_**

#### tabindex + role + name + events

Make custom controls fully interactive

This:

```html
<div tabIndex="0"
     role="button"
     aria-label="Close"
     onClick={clickHandler}
     onKeyDown={keydownHandler}>   
</div>
```

does the same as:

```html
// or just use a button :)
<button aria-label="Close"
        onClick={clickHandler}>   
</button>
```

### Aria Overview

#### ARIA: Accessible Rich Internet Applications

3 major components:

- **role**: what is it
- **state**: what is happening to it
- **property**: what's the nature of it

The first <u>rule of ARIA</u> is don't use it.

- native components do it already

- useful when you're inventing things

### Focus Management Patterns

#### Modal layers: disabling background content

- `aria-hidden="true"` and `tabindex="-1"`
- `inert` (+<u>polyfill</u>)
- CSS `display: none`

#### Focus management patterns

- Dropdowns and menus
- Layers and modals
- View changes and deletes
- Loading screens

#### Navigation vs. Actions

Links navigate, buttons give actions


# Learn HTML

## Getting Started with HTML

### 2 Important Categories of HTML Elements:

- **Block-level elements**:
  - form a visible block on a page
  - they will appear on a new line from whatever content went before it, and any content that goes after it will also appear on a new line.
  - tend to be structural elements on the page that represent, for example, paragraphs, lists, navigation menus, footers, and so on.
  - A block-level element wouldn't be nested inside an inline element, but it might be nested inside another block-level element
- **Inline elements**:
  - contained within block-level elements and surround only small parts of the document's content, not entire paragraphs and groupings of content
  - will not cause a new line to appear in the document
  - normally appear inside a paragraph of text
  - examples include an `<a>` element (hyperlink) or emphasis elements such as `<em>` or `<strong>`

**Important note**: changing the CSS display type doesn't change the category of the element and doesn't affect which elements it can contain and which elements it can be contained in.

#### Empty elements (a.k.a. *void elements*)

Some elements consist only of a single tag, which is usually used to insert/embed something in the document at the place it is included.

Example would be the `img` tag:

- `<img src="https://raw.githubusercontent.com/mdn/beginner-html-site/gh-pages/images/firefox-icon.png">`

### Attributes


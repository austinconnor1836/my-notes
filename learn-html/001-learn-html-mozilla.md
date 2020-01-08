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

![attributes](/home/austin/repos/my-notes/learn-html/images/attributes.png)

The `<a>` element has three attributes:

- **`href`**
- **`title`**: contains extra information about the link, such as what page is being linked to. For example, `title="The Mozilla homepage"`
- **`target`**

#### Boolean attributes

- some attributes can be written without values, these are called **boolean attributes**

  This:
  `<input type="text" disabled="disabled">`
  is equivalent to this:
  `<input type="text" disabled>`

#### Omitting quotes around attribute values

- this is allowable in some circumstances, but will break your markup in others.
- their advice is to always include the attribute quotes - it avoids such problems and results in more readable code too.

#### Single or double quotes?

- either are fine but be sure not to mix them together like this:
  `<a href="http://www.example.com'>A link to example.</a>`
- however, if you want to include a quote within quotes where both the quotes are of the same type, you'll have to use HTML entities for the quotes:
  `<a href='http://www.example.com' title='Isn&#39;t this fun?'>Example</a>`

## Anatomy of an HTML document

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My test page</title>
  </head>
  <body>
    <p>This is my page</p>
  </body>
</html>
```

- `<html></html>`: wraps all the content on the entire page, and is sometimes known as the root element.
- `<head></head>`: all the stuff you want to include on your HTML page, that *isn't* the content you are showing to your page's viewers.
- `<meta charset="utf-8">`: specifies the character set for your document to UTF-8, which includes most characters from the vast majority of human written languages. No reason not to set this.
- `<title></title>`: sets the title of the page, which is the title that appears in the **browser tab the page is loaded in**, and is used to describe the page when you bookmark/favorite it.



#### Whitespace in HTML

- no matter how much white space you have in your HTML, the HTML parser reduces each one down to a single space when rendering the code.
- Use ample white space for the sole purpose of readability



## Entity references: Including special characters in HTML

- In HTML, the characters `<`, `>`, `"`, and `&` are special characters.

| Literal character | Character reference equivalent |
| ----------------- | ------------------------------ |
| <                 | `&lt;`                         |
| >                 | `&gt;`                         |
| "                 | `&quot;`                       |
| '                 | `&apos;`                       |
| &                 | `&amp;`                        |


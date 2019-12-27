# Intermediate Gatsby with Gatsby Themes

What are the challenges of modern web development?

- The way we manage data is evolving
- Getting it right is *hard*

Gatsby **removes the boilerplate** for getting started & deploying apps to production.

Most companies are moving away from a monolithic cms to APIs so you can build a frontend on top of it.

Gatsby lets you use the tools that are specialized at what they do inside your application.

Gatsby has a centralized GraphQL layer. Then you query that layer with React. Then, it outputs static assets that you can upload to an AWS S3 storage bucket.

- This is great because you don't have to be running a server. Just a CDN (the best way to save cost).

For example, Gatsby's shop uses Shopify.

- first source is Shopify: it holds the image, price, etc. for each item
- Then on client side, they load Auth0 for authentication and they use the Shopify Buy SDK to dynamically load whether something is in stock and to manage a shopping cart.
- Then, once you are logged in, you can see your GitHub data (to see if you qualify for the discount code: $10 for one PR)
- **a cool way to use live data while being authenticated**

Gatsby can be dynamic using static assets.

The ultimate goal with Gatsby: **Make the Right Thing the Easy Thing**.

- Design your tools so the laziest, shortcuttiest, under-the-gunniest decisions a developer can make will still result in an excellent user experience.

Gatsby follows the <u>**PRPL pattern**</u> (Google Chrome Dev Team uses this for performance)

Gatsby generates **only static assets (no server required)**

- optimizes and lazy-loads assets
- normalizes third-party data (you don't have to figure out how to make a ton of asynchronous calls)

Webpack and Babel are fully customizable through Gatsby APIs.

Customize only what you need - no ejection required.

**So What is Gatsby?**

- Gatsby is <u>fast in all the ways that matter.</u>
- Gatsby makes developing for the web fun.
  - No dealing with Webpack configs.
  - Time not spent trying to get the boilerplate code working.

### Gatsby Advanced Features Overview

- Theming and theme composition
- Custom data sources (not going to do this but will do schema customization, which covers most of the basics of sourcing data)
- Combining build-time and run-time data
  - for things that change infrequently or frequently
- Schema customization and custom data types
  - if data is empty, we can return empty sets back
  - Our page could come from markdown, Wordpress, Contentful, etc.
    - Not going to get into this today
- Essentially anything React can do, Gatsby can handle

### Today's Agenda, Part 1:

1. Create a custom Gatsby theme for documentation
2. Use MDX for powerful content authoring
3. Define custom data types
4. Use Theme UI to define a custom theme
5. Add support for live-editing example code

### Today's Agenda, Part 2:

1. Install our custom theme on an existing site
2. Customize the theme using options
3. Use component shadowing to extend Theme UI

### Today's Agenda, Part 3:

1. Create a Negroni fan site using the docs theme
2. Extend Theme UI to customize the theme
3. Use Cloudinary to manage images
4. Use component shadowing to customize components
5. Compose two themes together in a single site

### Today's Agenda, Part 4:

1. Set up a dynamic app with client-side GraphQL using Apollo
2. Configure client-only routes in Gatsby
3. Create redirects in Netlify
4. Create a search form using React hooks
5. Create linkable search results page



Why Themes are better than boilerplate:

- Themes are npm packages
  - can get updates much easier with `npm install package@latest`
- Boilerplate is a repo
  - you have to make sure your repo is up to date with the upstream branch
- Gatsby Themes are both for the UI and for the functionality
  - it is a fully functional site


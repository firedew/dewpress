---
title: Getting started
---
# Getting started
Install DewPress as a npm dependency.

```bash
# yarn
yarn add -D dewpress

# npm
npm install -D dewpress
```

You may also install it globally to be used as a CLI anywhere. This is not the recommended way, it is generally better
to keep your dependencies local to your project to allow for separate upgrades per project.
```bash
npm install -g dewpress
```

## Minimal setup
Currently this setup is the only one DewPress supports. Newer features will be added weekly so make sure to
check in regularly if you like this project and want to see more!

With this setup DewPress will do a simple transformation of Markdown files into static html files. The routing
in this website is as simple as the folder structure of your files.

Creat a project with the following folder structure
```bash
src
 |- .dewpress
 |  |- config.ts
 |- index.md
 |- about
 |  |- index.md
 |- assets
 |  |- main.css   
```

This will create the following output
```bash
dist
 |- index.html
 |- main.css
 |- about
 |  |- index.html
```

### config
The file src/.dewpress/config.ts could be something like this
```typescript
export default {
  // Your website title (defaults to DewPress)
  title: 'You website title',
  head: {
    // Raw head options, will be injected as is into the <head> section of all generated html files
    raw: '<link href="/main.css" rel="stylesheet">'
  }
}
```

All configuration is optional.

### content
The file src/index.md could be something like this
```markdown
# Welcome
This is my awesome DewPress website!

[About](/about)
```

This will result in
```html
<h1>Welcome</h1>
<p>This is my awesome DewPress website!</p>
<a href="/about">About</a>
```

The file src/about/index.md could be something like this
```markdown
---
title: About
---
# About
Let me tell you something about myself.

[Home](/)
```

This will result in
```html
<h1>About</h1>
<p>Let me tell you something about myself.</p>
<a href="/">Home</a>
```

The first section enables site specific configuration using frontmatter. The title option here will append
this to the title set in the base config, in this case it will become `You website title | About`.

Note that the navigation is just the folder for your index.html. It does mean that your browser will do a full
page refresh on every navigation, which performs slightly worse than a Single Page Application. 
But it works and may even meet your need. As DewPress is un-opinionated the choice (as always) is yours.

### style
In the file src/assets/main.css you can place any styling you would like to apply to your website. As DewPress
currently only supports very basic HTML creation your styles will need to be global on HTML elements.

In future releases DewPress intends to add support for inserting classes on specific elements to enable
class specific styling.

Anything in the src/assets folder is copied as is into the dist folder and therefore available in all
your pages under the root /.

### build & preview
Build the website with the command

```bash
dewpress build
```

Preview the website with the command
```bash
dewpress preview
```

This should open your default browser and show you the content of your root index.html.

DewPress does not yet support hot reload, but this will be enabled in future releases. For now you will
need to build again on changes and refresh in the browser. The `preview` command will keep the server open, so
you only need to run this once. But you do need to refresh the page after each `build` command.

[Home](/)

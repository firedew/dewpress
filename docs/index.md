# DewPress

Welcome to DewPress, the Jamstack inspired Static Site Generator based on Vite and Markdown.

This page describes the first stuff to know about DewPress. It is intended as a framwork to enable
[Jamstack](https://jamstack.org/) based websites. It is completely unopinionated and flexible in design. Its sole concern
is to enable website generation from Markdown.

## Optional Hydration
You can choose whether to enable a Single Page Application or not. It is also possible to leave 
your website as list of static html files. It performs slightly worse as it will always need to perform a full
page reload on navigation, but the choice is yours to make.

## DewPress cli or plugin?

There will be two options to use DewPress:
1. As a cli (uses Vite under the hood)
2. As a Vite plugin

Both are valid options and will be fully supported. Including the possibility to move from one option to another at a later stage
if desired.

### Why would you choose one above the other?
The CLI option is there to provide minimal effort website generation with DewPress. 
The cli uses Vite under the hood, but you can build your website using just the DewPress documentation. 
There is no need to pick up the learning curve of using Vite (although we do encourage you to, it's a great tool!).

In some cases you may already have a Vite project or you may wish to use other utilities of Vite. 
For this scenario we provide access to the DewPress Vite plugin to include in your Vite config.

[Getting started](/getting_started/)
[About](/about/)

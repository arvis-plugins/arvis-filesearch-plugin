# arvis-filesearch-plugin

Cross platform file search plugin for [Arvis](https://github.com/jopemachine/arvis)

![](./demo.gif)

## Installation

```
$ npm i -g arvis-filesearch-plugin
```

## Config

You can edit this plugin's config.

You can open the config file by typing or copy and paste `@config/arvis-filesearch-plugin` to Arvis.

### include

type: `string []`

default value: `desktop folder`, `documents folder`, `downloads folder`, `home folder`.

To add more directory, Add path to find to `include` of `conf.js`

### exclude

type: `string []`

default value: `[]`

To exclude some directory, Add path to exclude to `exclude` of `conf.js`

### deep

type: `number`

default value: `1`

Sets the depth to explore

### concurrency

type: `number | undefined`

default value: `os.cpus().length`

Specifies the number of cpu to use for navigation

### maxItem

type: `number`

default value: `30`

Maximum number of output files

It doesn't affect performance.

### includeDotFiles

type: `boolean`

default value : `false`

Include files beginning with `.` in your search

## Icon sources

This plugin uses below icon sources

<a target="_blank" href="https://icons8.com">Image</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
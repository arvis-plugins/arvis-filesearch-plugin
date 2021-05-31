# arvis-filesearch-plugin

File search plugin for [Arvis](https://github.com/jopemachine/arvis) (Using [fast-glob](https://github.com/mrmlnc/fast-glob))

## Config

You can include or exclude the paths plugin will finds in `conf.js`.

### include

type: `string []`

To add more directory, Add path to find to `include` of `conf.js`

### exclude

type: `string []`

To exclude some directory, Add path to exclude to `exclude` of `conf.js`

### timer

type: `number`

Returns an empty array if `globAll` does not return during `timer`

If this value is set too large, `Arvis` may slow down

### deep

type: `number`

Sets the depth to explore

### concurrency

type: `number | undefined`

default value: `os.cpus().length`

Specifies the number of cpu to use for navigation

## Icon sources

This plugin uses below icon sources

<a target="_blank" href="https://icons8.com">Image</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
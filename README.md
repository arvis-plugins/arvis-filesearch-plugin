# arvis-filesearch-plugin

File search plugin for Arvis (Using [glob](https://github.com/isaacs/node-glob))

## Config

You can include or exclude the paths plugin will finds in `conf.js`.

### include

To add more directory, Add path to find to `include` of `conf.js`

### exclude

To exclude some directory, Add path to exclude to `exclude` of `conf.js`

### timer

Returns an empty array if `globAll` does not return during `timer`

If this value is set too large, `Arvis` may slow down
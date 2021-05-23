const { homedir, platform } = require("os");
const path = require("path");
const sep = path.sep;

module.exports = {
  include: {
    darwin: [
      `${homedir}${sep}Desktop`,
      `${homedir}${sep}Downloads`,
      `${homedir}${sep}Music`,
      `${homedir}${sep}Documents`,
    ],
  },
  exclude: [],
};

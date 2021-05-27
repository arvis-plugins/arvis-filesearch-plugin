const {
  getDesktopFolder,
  getDocumentsFolder,
  getDownloadsFolder,
  getHomeFolder,
} = require("platform-folders");

module.exports = {
  timer: 50,
  include: {
    darwin: [
      getDesktopFolder(),
      getDownloadsFolder(),
      getDocumentsFolder(),
      getHomeFolder(),
    ],
    win32: [
      getDesktopFolder(),
      getDownloadsFolder(),
      getDocumentsFolder(),
      getHomeFolder(),
    ],
    linux: [
      getDesktopFolder(),
      getDownloadsFolder(),
      getDocumentsFolder(),
      getHomeFolder(),
    ],
  },
  exclude: [],
};

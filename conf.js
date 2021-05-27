const {
  getDesktopFolder,
  getDocumentsFolder,
  getDownloadsFolder,
  getHomeFolder,
  getVideosFolder,
  getMusicFolder,
  getPicturesFolder,
  getSaveGamesFolder,
} = require("platform-folders");

const defaultFolders = [
  getDesktopFolder(),
  getDownloadsFolder(),
  getDocumentsFolder(),
  getHomeFolder(),
  // getVideosFolder(),
  // getMusicFolder(),
  // getPicturesFolder(),
  // getSaveGamesFolder(),
];

module.exports = {
  timer: 50,
  include: {
    darwin: [
      ...defaultFolders
    ],
    win32: [
      ...defaultFolders
    ],
    linux: [
      ...defaultFolders
    ],
  },
  exclude: [],
};

const arvish = require("arvish");
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

const darwin = [];
const win32 = [];
const linux = [];

if (!arvish.getConfig().has("setting")) {
  const defaultConfig = {
    timer: 100,
    include: [...defaultFolders],
    exclude: [],
    maxItem: 30,
    deep: 2,
    includeDotFiles: false,
  };

  arvish.getConfig().set("setting", defaultConfig);
}

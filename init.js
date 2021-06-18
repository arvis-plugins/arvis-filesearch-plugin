const arvish = require("arvish");
const getEnv = (key) => process.env[`arvis_${key}`];

const defaultFolders = [
  getEnv('platform_desktop'),
  getEnv('platform_downloads'),
  getEnv('platform_documents'),
  getEnv('platform_home'),
];

const darwin = [];
const win32 = [];
const linux = [];

if (!arvish.getConfig().has("setting")) {
  const defaultConfig = {
    include: [...defaultFolders],
    exclude: [],
    maxItem: 30,
    deep: 1,
    includeDotFiles: false,
  };

  arvish.getConfig().set("setting", defaultConfig);
}

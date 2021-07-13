const fg = require("fast-glob");
const path = require("path");
const os = require("os");
const arvish = require("arvish");
const { getIcon, getRootDir } = require("./utils");

const pluginConf = {
  include: JSON.parse(process.env.include),
  customInclude: JSON.parse(process.env.customInclude),
  exclude: JSON.parse(process.env.exclude),
  maxItem: Number(process.env.maxItem),
  deep: Number(process.env.deep),
  includeDotFiles: Boolean(process.env.includeDotFiles),
};

const sep = path.sep;

const getPluginItems = async ({ inputStr }) => {
  if (inputStr === "")
    return {
      items: [],
    };

  const configItems = [];

  return new Promise((resolve, reject) => {
    const globOpts = {
      absolute: true,
      caseSensitiveMatch: false,
      cwd: getRootDir(),
      deep: pluginConf.deep,
      dot: pluginConf.includeDotFiles,
      markDirectories: true,
      onlyDirectories: false,
      onlyFiles: false,
      suppressErrors: true,
      concurrency: pluginConf.concurrency
        ? pluginConf.concurrency
        : os.cpus().length,
    };

    let targetPaths = [
      ...pluginConf.customInclude.map((filePath) => `${filePath}${sep}*${inputStr}*`),
      ...pluginConf.customInclude.map(
        (filePath) => `${filePath}${sep}**${sep}*${inputStr}*`
      ),

      ...pluginConf.include.map((platformEnvKey) => `${arvish.env.platform[platformEnvKey]}${sep}*${inputStr}*`),
      ...pluginConf.include.map(
        (platformEnvKey) => `${arvish.env.platform[platformEnvKey]}${sep}**${sep}*${inputStr}*`
      ),

      ...pluginConf.exclude.map((filePath) => `!${filePath}`),
    ];

    if (process.platform === "win32") {
      targetPaths = targetPaths.map((targetPath) =>
        targetPath.split("\\").join("/")
      );
    } else {
      targetPaths = targetPaths.map((targetPath) => path.resolve(targetPath));
    }

    const getFileOrDirName = (filePath) => {
      return filePath.endsWith("/")
        ? filePath
          .substring(0, filePath.length - 1)
          .split("/")
          .pop()
        : filePath.split("/").pop();
    };

    fg(targetPaths, globOpts)
      .then(async (files) => {
        const items = files.map((filePath) => {
          const fileName = getFileOrDirName(filePath);

          return {
            title: fileName,
            subtitle: filePath,
            arg: filePath,
            fileName,
            filePath,
          };
        });

        await Promise.all(
          items.map(async (item) => {
            item.icon = `icons/${await getIcon(item.fileName, item.filePath)}`;
          })
        );

        resolve({
          items: [...items.slice(0, pluginConf.maxItem), ...configItems],
        });
      })
      .catch((err) => {
        console.error("arvis-filesearch-plugin throws an Error", err);
        resolve({ items: [] });
      });
  });
};

module.exports = getPluginItems;

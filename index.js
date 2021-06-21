const fg = require("fast-glob");
const path = require("path");
const os = require("os");
const arvish = require("arvish");
const { getIcon, getRootDir } = require("./utils");
require("./init");
const pluginConf = arvish.config.get("setting");

const sep = path.sep;

const getPluginItems = async ({ inputStr }) => {
  if (inputStr === "")
    return {
      items: [],
    };

  const configItems = [
    {
      command: "@config/arvis-filesearch-plugin",
      title: "Open config file of arvis-filesearch-plugin",
      subtitle: "@config/arvis-filesearch-plugin",
      arg: arvish.config.path,
    },
  ];

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
      ...pluginConf.include.map(
        (filePath) => `${filePath}${sep}**${sep}*${inputStr}*`
      ),
      ...pluginConf.include.map((filePath) => `${filePath}${sep}*${inputStr}*`),
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

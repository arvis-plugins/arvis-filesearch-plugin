const fg = require("fast-glob");
const path = require("path");
const os = require("os");
const stringSimilarity = require("string-similarity");
const arvish = require("arvish");
const { getIcon, getRootDir } = require("./utils");
require("./init");
const pluginConf = arvish.getConfig().get("setting");

const sep = path.sep;

const getPluginItems = async ({ inputStr }) => {
  if (
    inputStr === "@config" ||
    inputStr.startsWith("@config/arvis-filesearch-plugin")
  ) {
    return {
      items: [
        {
          title: "Open config file of arvis-filesearch-plugin",
          subtitle: arvish.getConfig().path,
          arg: arvish.getConfig().path,
        },
      ],
    };
  }

  return new Promise((resolve, reject) => {
    const timeoutTimer = setTimeout(() => resolve([]), pluginConf.timer);

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
      ...pluginConf.include.map((filePath) => `${filePath}${sep}**${sep}*${inputStr}*`),
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
      return filePath.endsWith(sep)
        ? filePath
            .substring(0, filePath.length - 1)
            .split(sep)
            .pop()
        : filePath.split(sep).pop();
    };

    fg(targetPaths, globOpts)
      .then((files) => {
        clearTimeout(timeoutTimer);

        const items = files
          .map((filePath) => {
            const fileName = getFileOrDirName(filePath);

            return {
              title: fileName,
              subtitle: filePath,
              arg: filePath,
              similarity: stringSimilarity.compareTwoStrings(
                inputStr,
                fileName
              ),
              icon: {
                path: `${__dirname}${sep}icons${sep}${getIcon(filePath)}`,
              },
            };
          })
          .sort((a, b) => (a.similarity < b.similarity ? 1 : -1));

        resolve({
          items: items.slice(0, pluginConf.maxItem),
        });
      })
      .catch((err) => {
        console.error("arvis-filesearch-plugin throws an Error", err);
        resolve({ items: [] });
      });
  });
};

module.exports = getPluginItems;

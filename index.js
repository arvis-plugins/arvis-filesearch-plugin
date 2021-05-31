const fg = require("fast-glob");
const path = require("path");
const os = require("os");
const pluginConf = require("./conf");
const { getIcon, getRootDir } = require("./utils");

const sep = path.sep;

const getPluginItems = async (inputStr) => {
  return new Promise((resolve, reject) => {
    const timeoutTimer = setTimeout(() => resolve([]), pluginConf.timer);

    const globOpts = {
      markDirectories: true,
      dot: true,
      cwd: getRootDir(),
      absolute: true,
      caseSensitiveMatch: false,
      deep: pluginConf.deep,
      concurrency: pluginConf.concurrency
        ? pluginConf.concurrency
        : os.cpus().length,
      suppressErrors: true,
      onlyFiles: false,
      onlyDirectories: false,
    };

    let targetPaths = [
      ...pluginConf.include[process.platform].map(
        (filePath) => `${filePath}${sep}**${sep}*${inputStr}*`
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

        const items = files.map((filePath) => {
          const fileName = getFileOrDirName(filePath);

          return {
            title: fileName,
            subtitle: filePath,
            arg: filePath,
            icon: {
              path: `${__dirname}${sep}icons${sep}${getIcon(filePath)}`,
            },
          };
        });

        resolve({
          items,
        });
      })
      .catch((err) => {
        console.error("arvis-filesearch-plugin throws an Error", err);
        resolve({ items: [] });
      });
  });
};

module.exports = getPluginItems;

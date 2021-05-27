const globAll = require("glob-all");
const arvish = require("arvish");
const path = require("path");
const pluginConf = require("./conf");
const { getIcon, getRootDir } = require('./utils');

const sep = path.sep;

const getPluginItems = async (inputStr) => {
  return new Promise((resolve, reject) => {
    const timeoutTimer = setTimeout(() => resolve([]), pluginConf.timer);

    const globOpts = {
      cwd: getRootDir(),
      realpath: true,
      sync: false,
      follow: false,
      nocase: true,
    };

    const targetPaths = [
      ...pluginConf.include[process.platform].map(
        (filePath) => `${filePath}${sep}*${inputStr}*`
      ),
      ...pluginConf.exclude.map((filePath) => `!${filePath}`),
    ];

    globAll(targetPaths, globOpts, function (err, files) {
      if (err) {
        console.error("arvis-filesearch-plugin throws an Error", err);
        resolve([]);
      }
      clearTimeout(timeoutTimer);

      const items = files.map((filePath) => {
        const fileName = filePath.split(path.sep).pop();
        return {
          title: fileName,
          subtitle: filePath,
          arg: filePath,
          icon: {
            path: `${__dirname}${sep}icons${sep}${getIcon(fileName)}`,
          },
        };
      });

      resolve(arvish.output(items, { print: false }));
    });
  });
};

module.exports = getPluginItems;

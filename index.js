const globAll = require("glob-all");
const pathConf = require("./pathConf");
const arvish = require("arvish");
const path = require("path");

const sep = path.sep;
const timer = 50;

const getPluginItems = async (inputStr) => {
  return new Promise((resolve, reject) => {
    const timeoutTimer = setTimeout(() => resolve([]), timer);

    const globOpts = {
      cwd: "/",
      realpath: true,
      sync: false,
      follow: false,
      nocase: true,
    };

    const targetPaths = [
      ...pathConf.include[process.platform].map(
        (filePath) => `${filePath}${sep}*${inputStr}*`
      ),
      ...pathConf.exclude.map((filePath) => `!${filePath}`),
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
            path: `${__dirname}${path.sep}icon.png`,
          },
        };
      });

      resolve(arvish.output(items));
    });
  });
};

module.exports = getPluginItems;

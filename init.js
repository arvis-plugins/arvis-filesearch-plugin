#!/usr/bin/env node
const arvish = require("arvish");
const fse = require("fs-extra");
const path = require("path");
const envPathsGenerator = require("env-paths");
const envPaths = envPathsGenerator('arvis');

const darwin = [];
const win32 = [];
const linux = [];

const defaultConfig = {
  include: ['desktop', 'downloads', 'documents', 'home'],
  customInclude: [],
  exclude: [],
  maxItem: 30,
  deep: 1,
  includeDotFiles: false,
};

const pluginSetting = require('./arvis-plugin.json');

pluginSetting.variables = {
  ...defaultConfig,
  ...pluginSetting.variables,
};

fse.writeJSONSync('./arvis-plugin.json', pluginSetting, { encoding: 'utf-8', spaces: 4 });

const arvisRenewExtensionFlagFilePath = path.resolve(envPaths.data, 'arvis-extension-renew');
fse.writeJSONSync(arvisRenewExtensionFlagFilePath, '');
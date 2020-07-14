#!/usr/bin/env node
const fs = require("fs");

const files = process.argv.slice(2);

files.map(filePath => {
  const jsFileContent = fs.readFileSync(filePath, "utf-8");
  const mjsFilePath = replaceJsToMjs(filePath);
  const mjsFileContent = jsFileContent.replace(
    /\/\/# sourceMappingURL=(.+)\.js\.map$/,
    "//# sourceMappingURL=$1.mjs.map"
  );
  fs.writeFileSync(mjsFilePath, mjsFileContent);

  const mapFilePath = `${filePath}.map`;
  const mapFileContent = fs.readFileSync(mapFilePath, "utf-8");
  const json = JSON.parse(mapFileContent);
  json.file = replaceJsToMjs(json.file);
  const mjsMapFileContent = JSON.stringify(json);
  const mjsMapFilePath = `${mjsFilePath}.map`;
  fs.writeFileSync(mjsMapFilePath, mjsMapFileContent);
});

function replaceJsToMjs(string) {
  return string.replace(/\.js$/, ".mjs");
}

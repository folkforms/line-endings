const fs = require("fs-extra");
const fileio = require("@folkforms/file-io");

const lineEndings = (option, path, eolc, ignoreFile) => {
  console.log(`option = ${option}`);
  console.log(`path = ${path}`);
  console.log(`eolc = ${eolc}`);
  console.log(`ignoreFile = ${ignoreFile}`);

  // const files = fileio.glob(path)
  // filter out ignored files (find a library)
  // read files and check eol
  // write files if necessary
}

module.exports = lineEndings;

const fs = require("fs-extra");
const fileio = require("@folkforms/file-io");

const lineEndings = (option, path, eolc, ignoreFile) => {
  // console.log(`option = ${option}`);
  // console.log(`path = ${path}`);
  // console.log(`eolc = ${eolc}`);
  // console.log(`ignoreFile = ${ignoreFile}`);

  const files = fileio.glob(path);
  const failed = [];
  // files = removeIgnored(files); // filter out ignored files (find a library)
  files.forEach(file => {
    // read file and check eol
    const originalData = fs.readFileSync(file, "utf-8");
    let newData = originalData.split(/\n|\r\n/);
    if(eolc === "LF") {
      newData = newData.join("\n");
    } else if(eolc === "CRLF") {
      newData = newData.join("\r\n");
    }

    // Check or write files
    if(option === "check") {
      if(originalData !== newData) {
        failed.push(file);
      }
    } else if(option === "write") {
      fileio.writeLines(file, newData);
    }
  });

  if(failed.length > 0) {
    const err = new Error("The following files failed the line-ending check:");
    err.failedFiles = failed;
    throw err;
  }
}

module.exports = lineEndings;

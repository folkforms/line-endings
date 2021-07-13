const fs = require("fs-extra");
const fileio = require("@folkforms/file-io");

const lineEndings = (option, path, eolc, ignoreFile) => {
  // console.log(`option = ${option}`);
  // console.log(`path = ${path}`);
  // console.log(`eolc = ${eolc}`);
  // console.log(`ignoreFile = ${ignoreFile}`);

  const files = fileio.glob(path);
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
    // FIXME Throw failed files into a list and throw an error at the end
    if(option === "check") {
      if(originalData !== newData) {
        throw new Error(`File '${file}' failed line endings check`);
      }
    } else if(option === "write") {
      fileio.writeLines(file, newData);
    }
  });
}

module.exports = lineEndings;

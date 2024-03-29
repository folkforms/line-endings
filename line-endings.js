const fs = require("fs-extra");
const fileio = require("@folkforms/file-io");
const ignore = require("ignore");

const lineEndings = (option, path, eolc) => {
  let files = fileio.glob(path);
  files = files.map(file => file.startsWith("./") ? file.substring(2) : file);

  let dotFiles = fileio.glob(path, { dot: true });
  dotFiles = dotFiles.filter(f => f.endsWith(".gitignore") || f.endsWith(".line-endings-ignore"));
  const ignoreData = readIgnoreData(dotFiles);
  ignoreData.push("**/yarn.lock");
  ignoreData.push("**/package-lock.json");

  const ig = ignore().add(ignoreData);
  files = ig.filter(files);

  const failed = [];
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
    console.log("ERROR: The following files failed the line-ending check:");
    for(let i = 0; i < failed.length; i++) {
      console.log(failed[i]);
    }
    return { code: 1, failed };
  }
  return { code: 0 };
}

const readIgnoreData = inputFiles => {
  let data = [];
  inputFiles.forEach(ignoreFile => {
    let ignoreData = fileio.readLines(ignoreFile);
    ignoreData = ignoreData.filter(f => f.length > 0);
    ignoreData = ignoreData.map(item => `${ignoreFile.substring(0, ignoreFile.lastIndexOf("/") + 1)}${item}`);
    ignoreData = ignoreData.map(item => item.replace(/\/{2,}/g, "/"));
    ignoreData = ignoreData.map(item => item.startsWith("./") ? item.substring(2) : item);
    data.push(ignoreData);
  });
  return data.flat();
}

module.exports = lineEndings;

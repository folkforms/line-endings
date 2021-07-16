const lineEndings = require("./line-endings");
const { Command } = require('commander');
const fs = require("fs-extra");
const program = new Command();

program
  .option('-c, --check <path>', 'Check line endings')
  .option('-w, --write <path>', 'Write line endings')
  .requiredOption('-l, --line-ending <type>', 'Line ending to use: LF or CRLF')
  .option('-i, --ignore <path>', 'Choose a different ignore file. Will assume .gitignore by default.');
program.parse(process.argv);

const option = program.opts().write ? "write" : "check"
const path = program.opts().check || program.opts().write;
const eolc = program.opts().lineEnding;
let ignoreFile = program.opts().ignore || fs.existsSync(".gitignore") ? ".gitignore" : undefined;

return lineEndings(option, path, eolc, ignoreFile);

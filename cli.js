#!/usr/bin/env node

const lineEndings = require("./line-endings");
const { Command } = require('commander');
const program = new Command();

program
  .option('-c, --check <path>', 'Check line endings')
  .option('-w, --write <path>', 'Write line endings')
  .requiredOption('-l, --line-ending <type>', 'Line ending to use: LF or CRLF');
program.parse(process.argv);

const option = program.opts().write ? "write" : "check"
const path = program.opts().check || program.opts().write;
const eolc = program.opts().lineEnding;

return lineEndings(option, path, eolc);

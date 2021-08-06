const testWithDataFolder = require("test-with-data-folder");
const lineEndings = require("./line-endings");

const consoleLogBackup = console.log;

beforeAll(() => {
  console.log = () => {};
});

afterAll(() => {
  console.log = consoleLogBackup;
});

// -------- 'Check' tests --------

test('that LF file passes LF line ending check', () => {
  const r = lineEndings("check", "./test-data/check/test-case-1/LF-file.txt", "LF");
  expect(r.code).toEqual(0);
});

test('that CRLF file passes CRLF line ending check', () => {
  const r = lineEndings("check", "./test-data/check/test-case-1/CRLF-file.txt", "CRLF");
  expect(r.code).toEqual(0);
});

test('that LF file fails CRLF line ending check', () => {
  const r = lineEndings("check", "./test-data/check/test-case-1/LF-file.txt", "CRLF");
  expect(r.failed).toEqual([ "test-data/check/test-case-1/LF-file.txt" ]);
  expect(r.code).toEqual(1);
});

test('that CRLF file fails LF line ending check', () => {
  const r = lineEndings("check", "./test-data/check/test-case-1/CRLF-file.txt", "LF");
  expect(r.failed).toEqual([ "test-data/check/test-case-1/CRLF-file.txt" ]);
  expect(r.code).toEqual(1);
});

test('that multiple CRLF files fail LF line ending check', () => {
  const expectedFiles = [
    "test-data/check/test-case-2/CRLF-file 1.txt",
    "test-data/check/test-case-2/CRLF-file 2.txt",
  ];
  const r = lineEndings("check", "./test-data/check/test-case-2/*.txt", "LF");
  expect(r.failed).toEqual(expectedFiles);
  expect(r.code).toEqual(1);
});

test('that multiple LF files fail CRLF line ending check', () => {
  const expectedFiles = [
    "test-data/check/test-case-2/LF-file 1.txt",
    "test-data/check/test-case-2/LF-file 2.txt",
  ];
  const r = lineEndings("check", "./test-data/check/test-case-2/*.txt", "CRLF");
  expect(r.failed).toEqual(expectedFiles);
  expect(r.code).toEqual(1);
});

// -------- 'Write' tests --------

test('that CRLF file is converted to LF', () => {
  // Define paths
  const inputFolder = "./test-data/write/test-case-1/input";
  const expectedFolder = "./test-data/write/test-case-1/expected";
  const temporaryFolder = "./test-data/write/test-case-1/temp";

  // Define the function under test
  const testFunction = () => { lineEndings("write", `${temporaryFolder}/*`, "LF"); };

  // Run the test
  testWithDataFolder(testFunction, inputFolder, expectedFolder, temporaryFolder);
});

test('that LF file is converted to CRLF', () => {
  // Define paths
  const inputFolder = "./test-data/write/test-case-2/input";
  const expectedFolder = "./test-data/write/test-case-2/expected";
  const temporaryFolder = "./test-data/write/test-case-2/temp";

  // Define the function under test
  const testFunction = () => { lineEndings("write", `${temporaryFolder}/*`, "CRLF"); };

  // Run the test
  testWithDataFolder(testFunction, inputFolder, expectedFolder, temporaryFolder);
});

// -------- 'Ignore' tests --------

test('that ignored files do not break the check', () => {
  lineEndings("check", "./test-data/ignore/test-case-1/**", "LF");
});

test('a mixture of ignored and not ignored files', () => {
  const expectedFailures = [ "test-data/ignore/test-case-1/LF-file 1.txt" ];
  const r = lineEndings("check", "./test-data/ignore/test-case-1/**", "CRLF");
  expect(r.failed).toEqual(expectedFailures);
  expect(r.code).toEqual(1);
});

test('that the .gitignore file does not need to be in the root folder', () => {
  const expectedFailures = [ "test-data/ignore/test-case-2/CRLF-file 1.txt" ];
  const r = lineEndings("check", "./test-data/ignore/test-case-2/**", "LF");
  expect(r.failed).toEqual(expectedFailures);
  expect(r.code).toEqual(1);
});

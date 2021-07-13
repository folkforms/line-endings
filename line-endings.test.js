const testWithDataFolder = require("test-with-data-folder");
const lineEndings = require("./line-endings");

// -------- 'Check' tests --------

test('that LF file passes LF line ending check', () => {
  lineEndings("check", "./test-data/check/test-case-1/LF-file.txt", "LF");
});

test('that CRLF file fails LF line ending check', () => {
  try {
    lineEndings("check", "./test-data/check/test-case-1/CRLF-file.txt", "LF");
  } catch(err) {
    expect(err).toEqual(new Error("File './test-data/check/test-case-1/CRLF-file.txt' failed line endings check"));
  }
});

test('that CRLF file passes CRLF line ending check', () => {
  lineEndings("check", "./test-data/check/test-case-1/CRLF-file.txt", "CRLF");
});

test('that LF file fails CRLF line ending check', () => {
  try {
    lineEndings("check", "./test-data/check/test-case-1/LF-file.txt", "CRLF");
  } catch(err) {
    expect(err).toEqual(new Error("File './test-data/check/test-case-1/LF-file.txt' failed line endings check"));
  }
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

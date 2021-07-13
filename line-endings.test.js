const lineEndings = require("./line-endings");

test('that LF file passes LF line ending check', () => {
  lineEndings("check", "./test-data/LF-file.txt", "LF", null);
});

test('that CRLF file fails LF line ending check', () => {
  try {
    lineEndings("check", "./test-data/CRLF-file.txt", "LF", null);
  } catch(err) {
    expect(err).toEqual(new Error("File './test-data/CRLF-file.txt' failed line endings check"));
  }
});

test('that CRLF file passes CRLF line ending check', () => {
  lineEndings("check", "./test-data/CRLF-file.txt", "CRLF", null);
});

test('that LF file fails CRLF line ending check', () => {
  try {
    lineEndings("check", "./test-data/LF-file.txt", "CRLF", null);
  } catch(err) {
    expect(err).toEqual(new Error("File './test-data/LF-file.txt' failed line endings check"));
  }
});

// Source: https://gist.github.com/scriptex/20536d8cda36221f91d69a6bd4a528b3

const { join } = require("path");
const { readdirSync, renameSync } = require("fs");
const [dir, search, replace] = process.argv.slice(2);
const match = RegExp(search, "g");
const files = readdirSync(dir);

files
  .filter((file) => file.match(match))
  .forEach((file) => {
    const filePath = join(dir, file);
    const newFilePath = join(dir, file.replace(match, replace));
    renameSync(filePath, newFilePath);
  });

// Usage
// node rename.js path/to/directory 'string-to-search' 'string-to-replace'

"use strict";
// this script generates a package containing an array of words
// the words are sourced from "words.txt"
// the files generated are "dist/index.js" and "dist/index.d.ts"
// the script is run at build-time using "npm build"
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
// words.txt is sourced from the Electronic Frontier Foundation (https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases)
// this word list:
//   - removes rarely used words e.g. "buret", "novo", "vacuo"
//   - removes proper names
//   - removes letter sequences e.g. "aaaa"
//   - removes words with punctuation
//   - removes anagrams
//   - removes vulgar words
//   - is licensed under creative commons (https://www.eff.org/copyright)
// read the contents of words.txt to a string
var fileContents = (0, fs_1.readFileSync)("words.txt", "utf-8");
// split the string into an array of lines
var lines = fileContents.split("\n");
// for each line, only keep the section after the first tab
var words = lines.map(function (line) { var _a; return (_a = line.split("\t")[1]) === null || _a === void 0 ? void 0 : _a.trim(); });
var js = "module.exports.words = [".concat(words
    .map(function (word) { return "\"".concat(word, "\""); })
    .join(", "), "];");
var distPath = (0, path_1.join)(__dirname, "..", "dist");
(0, fs_1.mkdirSync)(distPath, { recursive: true });
(0, fs_1.writeFileSync)((0, path_1.join)(distPath, "index.js"), js, { flag: "w" });
var dts = "export declare const words: string[];";
(0, fs_1.writeFileSync)((0, path_1.join)(distPath, "index.d.ts"), dts, { flag: "w" });

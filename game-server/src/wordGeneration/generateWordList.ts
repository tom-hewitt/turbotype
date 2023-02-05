import { readFileSync, writeFileSync } from "fs";

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
const fileContents = readFileSync("words.txt", "utf-8");

// split the string into an array of lines
const lines = fileContents.split("\n");

// for each line, only keep the section after the first tab
const words = lines.map((line) => line.split("\t")[1]);

const wordsTypescript = `export const words: string[] = [${words
  .map((word) => `"${word}"`)
  .join(", ")}];`;

writeFileSync("wordList.ts", wordsTypescript);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomWords = exports.randomWord = void 0;
const words_1 = require("@turbotype/words");
/**
 * Chooses a random item from an array. Will return undefined if the array is empty.
 * @returns the random item
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}
/**
 * Chooses a random word from the word list.
 * @returns the word
 */
const randomWord = () => {
    // we know this can't be undefined because the length of words is definitely > 0
    return randomChoice(words_1.words);
};
exports.randomWord = randomWord;
/**
 * Generates a list of n random words
 * @param n the number of words to generate
 * @returns the list of random words
 */
const randomWords = (n) => {
    return Array.from({ length: n }, exports.randomWord);
};
exports.randomWords = randomWords;

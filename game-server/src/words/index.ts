import { words } from "./wordList";

/**
 * A hash set containing the words that have been used already in the current game, so we don't use any twice.
 */
let usedWords = new Set();

/**
 * Chooses a random item from an array.
 */
function randomChoice<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates a random word, unique within the current session.
 * @returns the random word
 */
export function generateWord(): string {
  while (true) {
    // we know this can't be undefined because the length of words is definitely > 0
    const word = randomChoice(words)!;

    // if the word has already been used, continue to loop
    if (usedWords.has(word)) {
      continue;
    }

    usedWords.add(word);
    return word;
  }
}

import { words } from "./wordList";

/**
 * Chooses a random item from an array. Will return undefined if the array is empty.
 * @returns the random item
 */
function randomChoice<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Chooses a random word from the word list.
 * @returns the word
 */
export function randomWord(): string {
  // we know this can't be undefined because the length of words is definitely > 0
  return randomChoice(words)!;
}

console.log(randomWord(), randomWord(), randomWord());

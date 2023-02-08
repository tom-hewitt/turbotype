import { applyKeyInput } from "./input";
import { randomWord } from "./words";

export { applyKeyInput, randomWord };

export type WordState = {
  word: string;
  characterIndex: number;
  incorrectCharacterCount: number;
};

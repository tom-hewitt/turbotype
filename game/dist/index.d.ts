export { randomWord, randomWords } from "./words";
export type TypingState = {
    word: string;
    wordIndex: number;
    characterIndex: number;
    incorrectCharacterCount: number;
} | null;
export declare enum PlayerAction {
    CORRECT_LETTER = 0,
    INCORRECT_LETTER = 1,
    CORRECT_WORD = 2
}
export declare const ACTION_PROGRESS_INCREASES: Record<PlayerAction, number>;
export interface KeyInputResult {
    state: TypingState;
    action?: PlayerAction;
}
/**
 * calculates the action and new state resulting from a key input
 * @param state the state prior to the key input, containing the current word, wordIndex, characterIndex, and incorrectCharacterCount
 * @param keyInput the key input string
 * @param wordList the list of words for the current race
 * @returns an object containing the action and new state
 */
export declare const applyKeyInput: (state: TypingState, keyInput: string, wordList: string[]) => KeyInputResult;
/**
 * calculates the current race progress based on a list of past actions
 * @param actions the list of past actions
 * @returns a number representing the current race progress
 */
export declare const calculateProgress: (actions: PlayerAction[]) => number;
export declare const calculateFinishProgress: (wordList: string[]) => number;

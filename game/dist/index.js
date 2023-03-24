"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFinishProgress = exports.calculateProgress = exports.applyKeyInput = exports.ACTION_PROGRESS_INCREASES = exports.PlayerAction = exports.randomWords = exports.randomWord = void 0;
var words_1 = require("./words");
Object.defineProperty(exports, "randomWord", { enumerable: true, get: function () { return words_1.randomWord; } });
Object.defineProperty(exports, "randomWords", { enumerable: true, get: function () { return words_1.randomWords; } });
var PlayerAction;
(function (PlayerAction) {
    PlayerAction[PlayerAction["CORRECT_LETTER"] = 0] = "CORRECT_LETTER";
    PlayerAction[PlayerAction["INCORRECT_LETTER"] = 1] = "INCORRECT_LETTER";
    PlayerAction[PlayerAction["CORRECT_WORD"] = 2] = "CORRECT_WORD";
})(PlayerAction = exports.PlayerAction || (exports.PlayerAction = {}));
exports.ACTION_PROGRESS_INCREASES = {
    [PlayerAction.CORRECT_LETTER]: 1,
    [PlayerAction.INCORRECT_LETTER]: 0,
    [PlayerAction.CORRECT_WORD]: 3,
};
/**
 * calculates the action and new state resulting from a key input
 * @param state the state prior to the key input, containing the current word, wordIndex, characterIndex, and incorrectCharacterCount
 * @param keyInput the key input string
 * @param wordList the list of words for the current race
 * @returns an object containing the action and new state
 */
const applyKeyInput = (state, keyInput, wordList) => {
    // end or start state
    if (state === null || state.word === "") {
        return { state };
    }
    const isCorrect = keyInput === state.word[state.characterIndex] &&
        state.incorrectCharacterCount === 0;
    if (isCorrect) {
        const isWordComplete = state.characterIndex + 1 === state.word.length;
        if (isWordComplete) {
            // if the user has finished
            if (state.wordIndex + 1 >= wordList.length) {
                return {
                    state: null,
                    action: PlayerAction.CORRECT_WORD,
                };
            }
            return {
                state: Object.assign(Object.assign({}, state), { characterIndex: 0, wordIndex: state.wordIndex + 1, word: wordList[state.wordIndex + 1] }),
                action: PlayerAction.CORRECT_WORD,
            };
        }
        return {
            state: Object.assign(Object.assign({}, state), { characterIndex: state.characterIndex + 1 }),
            action: PlayerAction.CORRECT_LETTER,
        };
    }
    else {
        if (keyInput === "Backspace") {
            return {
                state: Object.assign(Object.assign({}, state), { 
                    // clamp the count above zero
                    incorrectCharacterCount: Math.max(state.incorrectCharacterCount - 1, 0) }),
            };
        }
        return {
            state: Object.assign(Object.assign({}, state), { incorrectCharacterCount: state.incorrectCharacterCount + 1 }),
            action: PlayerAction.INCORRECT_LETTER,
        };
    }
};
exports.applyKeyInput = applyKeyInput;
/**
 * calculates the current race progress based on a list of past actions
 * @param actions the list of past actions
 * @returns a number representing the current race progress
 */
const calculateProgress = (actions) => {
    return actions.reduce((sum, action) => sum + exports.ACTION_PROGRESS_INCREASES[action], 0);
};
exports.calculateProgress = calculateProgress;
const calculateFinishProgress = (wordList) => {
    const characterCount = wordList.reduce((sum, word) => sum + word.length - 1, 0);
    const characterProgress = characterCount * exports.ACTION_PROGRESS_INCREASES[PlayerAction.CORRECT_LETTER];
    const wordProgress = (wordList.length - 1) *
        exports.ACTION_PROGRESS_INCREASES[PlayerAction.CORRECT_WORD];
    console.log({
        wordList,
        characterCount,
        characterProgress,
        wordProgress,
        sum: characterProgress + wordProgress,
    });
    return characterProgress + wordProgress;
};
exports.calculateFinishProgress = calculateFinishProgress;

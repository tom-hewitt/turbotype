export { randomWord, randomWords } from "./words";

export interface TypingState {
  word: string;
  wordIndex: number;
  characterIndex: number;
  incorrectCharacterCount: number;
}

export enum PlayerAction {
  CORRECT_LETTER = 0,
  INCORRECT_LETTER = 1,
  CORRECT_WORD = 2,
}

export const ACTION_PROGRESS_INCREASES: Record<PlayerAction, number> = {
  [PlayerAction.CORRECT_LETTER]: 1,
  [PlayerAction.INCORRECT_LETTER]: 0,
  [PlayerAction.CORRECT_WORD]: 3,
};

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
export const applyKeyInput = (
  state: TypingState,
  keyInput: string,
  wordList: string[]
): KeyInputResult => {
  if (state.word === "") {
    return { state };
  }

  const isCorrect =
    keyInput === state.word[state.characterIndex] &&
    state.incorrectCharacterCount === 0;

  if (isCorrect) {
    const isWordComplete = state.characterIndex + 1 === state.word.length;

    if (isWordComplete) {
      // make sure we haven't run out of words
      // (we shouldn't let this happen in an actual game)
      if (state.wordIndex + 1 >= wordList.length) {
        console.error("Ran out of words!");

        return {
          state: {
            ...state,
            word: "",
            characterIndex: 0,
          },
          action: PlayerAction.CORRECT_WORD,
        };
      }

      return {
        state: {
          ...state,
          characterIndex: 0,

          wordIndex: state.wordIndex + 1,
          word: wordList[state.wordIndex + 1]!,
        },
        action: PlayerAction.CORRECT_WORD,
      };
    }

    return {
      state: {
        ...state,
        characterIndex: state.characterIndex + 1,
      },
      action: PlayerAction.CORRECT_LETTER,
    };
  } else {
    if (keyInput === "Backspace") {
      return {
        state: {
          ...state,
          // clamp the count above zero
          incorrectCharacterCount: Math.max(
            state.incorrectCharacterCount - 1,
            0
          ),
        },
      };
    }

    return {
      state: {
        ...state,
        incorrectCharacterCount: state.incorrectCharacterCount + 1,
      },
      action: PlayerAction.INCORRECT_LETTER,
    };
  }
};

/**
 * calculates the current race progress based on a list of past actions
 * @param actions the list of past actions
 * @returns a number representing the current race progress
 */
export const calculateProgress = (actions: PlayerAction[]): number => {
  return actions.reduce(
    (sum, action) => sum + ACTION_PROGRESS_INCREASES[action],
    0
  );
};

export const calculateFinishProgress = (wordList: string[]): number => {
  const characterCount = wordList.reduce(
    (sum, word) => sum + word.length - 1,
    0
  );

  const characterProgress =
    characterCount * ACTION_PROGRESS_INCREASES[PlayerAction.CORRECT_LETTER];

  const wordProgress =
    (wordList.length - 1) *
    ACTION_PROGRESS_INCREASES[PlayerAction.CORRECT_WORD];

  console.log({
    wordList,
    characterCount,
    characterProgress,
    wordProgress,
    sum: characterProgress + wordProgress,
  });

  return characterProgress + wordProgress;
};

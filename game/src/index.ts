import { randomWord, randomWords } from "./words";

export { applyKeyInput, randomWord, randomWords };

export interface WordState {
  word: string;
  wordIndex: number;
  characterIndex: number;
  incorrectCharacterCount: number;
}

export enum PlayerAction {
  CORRECT_WORD,
  INCORRECT_LETTER,
}

export interface PlayerClient {
  onWordList: (list: string[]) => void;
  onAction(action: PlayerAction, playerID: number): void;
}

const BASE_SPEED = 10;

const SPEED_BOOST_AMOUNT = 20;
const SPEED_PENALTY_AMOUNT = 5;
const SPEED_RECOVERY_RATE = 1;

const applySpeedRecovery = (speed: number, delta: number): number => {
  if (speed > BASE_SPEED) {
    return speed - SPEED_RECOVERY_RATE * delta;
  } else if (speed < BASE_SPEED) {
    return speed + SPEED_RECOVERY_RATE * delta;
  }

  return speed;
};

export const updateSpeed = (
  speed: number,
  action: PlayerAction | null,
  delta: number
): number => {
  switch (action) {
    case PlayerAction.CORRECT_WORD: {
      return speed + SPEED_BOOST_AMOUNT;
    }
    case PlayerAction.INCORRECT_LETTER: {
      return speed - SPEED_PENALTY_AMOUNT;
    }
    default: {
      return applySpeedRecovery(speed, delta);
    }
  }
};

export const updateSpeedAndProgress = (
  progress: number,
  speed: number,
  action: PlayerAction | null,
  delta: number
): { progress: number; speed: number } => {
  return {
    progress: progress + speed * delta,
    speed: updateSpeed(speed, action, delta),
  };
};

const applyKeyInput = (
  state: WordState,
  keyInput: string,
  wordList: string[]
): { state: WordState; action: PlayerAction | null } => {
  if (state.word === "") {
    return { state, action: null };
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
          action: null,
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
      action: null,
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
        action: null,
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

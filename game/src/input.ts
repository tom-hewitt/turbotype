import { WordState } from ".";

export const applyKeyInput = (state: WordState, key: string): WordState => {
  // if there is no word yet then ignore the input, and keep the state unchanged
  if (state.word === "") {
    return { ...state };
  }

  const correct =
    key === state.word[state.characterIndex] &&
    state.incorrectCharacterCount === 0;

  if (correct) {
    return {
      ...state,
      characterIndex: state.characterIndex + 1,
    };
  } else {
    return {
      ...state,
      incorrectCharacterCount:
        key === "Backspace"
          ? // clamp the count above zero
            Math.max(state.incorrectCharacterCount - 1, 0)
          : state.incorrectCharacterCount + 1,
    };
  }
};

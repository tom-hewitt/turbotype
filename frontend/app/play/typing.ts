import { useEffect, useMemo, useReducer } from "react";
import {
  applyKeyInput,
  calculateProgress,
  PlayerAction,
  TypingState,
} from "@turbotype/game";

export const useWordState = ({
  wordList,
  sendKeyInput,
  hasRaceStarted,
}: {
  wordList: string[];
  sendKeyInput: (key: string) => void;
  hasRaceStarted: () => boolean;
}): TypingState => {
  const [state, dispatch] = useReducer(
    (state: TypingState, key: string) =>
      applyKeyInput(state, key, wordList).state,
    {
      word: wordList[0]!,
      wordIndex: 0,
      characterIndex: 0,
      incorrectCharacterCount: 0,
    }
  );

  // adds a key down listener, and removes it when finished with it
  useEffect(() => {
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (!hasRaceStarted()) {
        return;
      }

      console.log(key);

      // the only relevant key presses are letters or the backspace key
      const isRelevant =
        (key.length === 1 && key.match("[a-zA-Z]")) || key === "Backspace";

      if (!isRelevant) {
        return;
      }

      // send the key over the websocket to the server
      sendKeyInput(key);

      // update the local state, which will in turn update the UI
      dispatch(key);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [hasRaceStarted, sendKeyInput]);

  return state;
};

export const useProgress = (actions: PlayerAction[]): number => {
  return useMemo(() => calculateProgress(actions), [actions]);
};

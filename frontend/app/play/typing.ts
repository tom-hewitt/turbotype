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
    const onKeyDown = (event: KeyboardEvent) => {
      if (hasRaceStarted()) {
        // send the key over the websocket to the server
        // TODO: only send relevant key presses - ignore shift, ctrl, etc.
        // TODO: we could make this more efficient by using a number to represent the key
        sendKeyInput(event.key);

        // update the local state, which will in turn update the UI
        dispatch(event.key);
      }
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

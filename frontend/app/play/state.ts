import { useEffect, useReducer } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { applyKeyInput, WordState } from "@turbotype/game";

type Action = NewWordAction | KeyInputAction;

type NewWordAction = {
  type: "New Word";
  word: string;
};

type KeyInputAction = {
  type: "Key Input";
  key: string;
};

/**
 * Produces the new game state from the current state and a new action
 * @param state the current game state
 * @param action the new action
 * @returns the new game state
 */
const reducer = (state: WordState, action: Action): WordState => {
  switch (action.type) {
    case "New Word":
      return {
        word: action.word,
        characterIndex: 0,
        incorrectCharacterCount: 0,
      };
    case "Key Input":
      return applyKeyInput(state, action.key);
  }
};

/**
 * A react hook that:
 * - connects to the server via a websocket
 * - listens for key inputs and sends them to the server
 * - listens for new words from the server
 * - determines the current game state, based on the key inputs and new words
 * @returns the current game state
 */
export const useWordState = (): WordState => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8080"
  );

  const [state, dispatch] = useReducer(reducer, {
    word: "",
    characterIndex: 0,
    incorrectCharacterCount: 0,
  });

  // runs every time there is a new message from the server
  useEffect(() => {
    if (lastMessage?.data) {
      dispatch({
        type: "New Word",
        word: lastMessage.data,
      });
    }
  }, [lastMessage]);

  // adds a keydown event listener once the websocket is open
  // removes it when the websocket is closed or the component is unmounted
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      const onKeyDown = (event: KeyboardEvent) => {
        // send the key over the websocket to the server
        // TODO: only send relevant key presses - ignore shift, ctrl, etc.
        // TODO: we could make this more efficient by using a number to represent the key
        sendMessage(event.key);

        // update the local state, which will in turn update the UI
        dispatch({ type: "Key Input", key: event.key });
      };

      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.removeEventListener("keydown", onKeyDown);
      };
    }

    return;
  }, [readyState]);

  return state;
};

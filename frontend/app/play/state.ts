import { useEffect, useReducer, useState } from "react";
import useWebSocket from "react-use-websocket";
import { applyKeyInput, WordState } from "@turbotype/game";
import {
  ServerToClientMessage,
  ServerToClientMessageType,
} from "@turbotype/server";
import { decode } from "@msgpack/msgpack";
import { WordListMessage } from "@turbotype/server";

const isWordListMessage = (
  message: ServerToClientMessage
): message is WordListMessage => {
  return message[0] === ServerToClientMessageType.WORD_LIST;
};

export const useMultiplayerGame = (): {
  wordList: string[] | null;
  sendKeyInput: (key: string) => void;
} => {
  const { sendMessage, lastMessage } = useWebSocket("ws://localhost:8080");

  const [wordList, setWordList] = useState<string[] | null>(null);

  // runs every time there is a new message from the server
  useEffect(() => {
    if (lastMessage?.data) {
      if (lastMessage.data instanceof Blob) {
        lastMessage.data.arrayBuffer().then((buffer) => {
          const message = decode(buffer) as ServerToClientMessage;

          console.log(message);

          if (isWordListMessage(message)) {
            const [_, ...list] = message;
            setWordList(list);
          }
        });
      }
    }
  }, [lastMessage]);

  return { wordList, sendKeyInput: sendMessage };
};

/**
 * A react hook that:
 * - connects to the server via a websocket
 * - listens for key inputs and sends them to the server
 * - listens for new words from the server
 * - determines the current game state, based on the key inputs and new words
 * @returns the current game state
 */
export const useWordState = ({
  wordList,
  sendKeyInput,
}: {
  wordList: string[];
  sendKeyInput: (key: string) => void;
}): WordState => {
  const [state, dispatch] = useReducer(
    (state: WordState, key: string) =>
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
      // send the key over the websocket to the server
      // TODO: only send relevant key presses - ignore shift, ctrl, etc.
      // TODO: we could make this more efficient by using a number to represent the key
      sendKeyInput(event.key);

      // update the local state, which will in turn update the UI
      dispatch(event.key);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sendKeyInput]);

  return state;
};

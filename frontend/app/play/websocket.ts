import { decode } from "@msgpack/msgpack";
import { PlayerAction } from "@turbotype/game";
import {
  ServerToClientMessage,
  ServerToClientMessageType,
} from "@turbotype/server";
import { useCallback, useEffect, useReducer } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

export type MultiplayerRaceState = {
  playerID: number;
  startTime: number;
  wordList: string[];
  playerActions: PlayerAction[][];
};

const parseMessage = async (
  message: MessageEvent<any> | null
): Promise<ServerToClientMessage | null> => {
  return new Promise((resolve) => {
    if (message?.data instanceof Blob) {
      message.data.arrayBuffer().then((buffer) => {
        const message = decode(buffer) as ServerToClientMessage;

        resolve(message);
      });
    }
  });
};

const replaceAt = <T>(array: T[], index: number, newValue: T): T[] => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
};

const multiplayerRaceReducer = (
  state: MultiplayerRaceState | null,
  message: ServerToClientMessage
): MultiplayerRaceState | null => {
  switch (message[0]) {
    case ServerToClientMessageType.CONNECT: {
      const [_, playerID, startTime, playerCount, wordList] = message;

      return {
        playerID,
        startTime,
        wordList,
        playerActions: [...Array(playerCount).fill([])],
      };
    }
    case ServerToClientMessageType.ACTION: {
      const [_, playerID, action] = message;

      if (state === null) {
        throw new Error("Couldn't connect to server");
      }

      const actions = state.playerActions[playerID];

      if (actions === undefined) {
        throw new Error(`Couldn't find player ${playerID}`);
      }

      return {
        ...state,
        playerActions: replaceAt(state.playerActions, playerID, [
          ...actions,
          action,
        ]),
      };
    }
    default: {
      return state;
    }
  }
};

export const useMultiplayerRace = (): {
  state: MultiplayerRaceState | null;
  sendKeyInput: (key: string) => void;
} => {
  const { lastMessage, sendMessage } = useWebSocket("ws://localhost:8080");

  const [state, dispatch] = useReducer(multiplayerRaceReducer, null);

  console.log(state);

  useEffect(() => {
    parseMessage(lastMessage).then((message) => {
      if (message === null) {
        return;
      }

      dispatch(message);
    });
  }, [lastMessage, dispatch]);

  const sendKeyInput = useCallback(
    (key: string) => {
      // make sure that the race has actually started
      if (state !== null && Date.now() > state?.startTime) {
        sendMessage(key);
      }
    },
    [sendMessage, state?.startTime]
  );

  return { state, sendKeyInput };
};

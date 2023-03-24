import {
  ServerToClientMessage,
  ServerToClientMessageType,
} from "@turbotype/server";
import { MultiplayerRaceState } from "./websocket";

export const multiplayerRaceReducer = (
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

const replaceAt = <T>(array: T[], index: number, newValue: T): T[] => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
};

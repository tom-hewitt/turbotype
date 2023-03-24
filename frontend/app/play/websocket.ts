import { decode, encode } from "@msgpack/msgpack";
import { PlayerAction } from "@turbotype/game";
import {
  ServerToClientMessage,
  ServerToClientMessageType,
} from "@turbotype/server";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { useSupabase } from "../../database/provider";
import { multiplayerRaceReducer } from "./actions";

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

export const useMultiplayerRace = (): {
  state: MultiplayerRaceState | null;
  sendKeyInput: (key: string) => void;
} => {
  const { lastMessage, sendMessage } = useWebSocket("ws://localhost:8080");

  const [state, dispatch] = useReducer(multiplayerRaceReducer, null);

  const { session } = useSupabase();

  useEffect(() => {
    if (session) {
      sendMessage(encode([session.access_token, session.refresh_token]));
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    parseMessage(lastMessage).then((message) => {
      if (message === null) {
        return;
      }

      console.log(message);

      if (message[0] === ServerToClientMessageType.FINISHED) {
        const raceID = message[1];

        console.log(`/summary/${raceID}`);

        router.push(`/summary/${raceID}`);
      }

      dispatch(message);
    });
  }, [lastMessage, dispatch, router]);

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

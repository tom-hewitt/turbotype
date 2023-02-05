"use client";

import React, { useEffect, useReducer, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { HUD } from "./hud";
import { GameScene } from "./scene";
import styles from "./styles.module.css";

/**
 * Holds the state of the game
 */
type GameState = {
  word: string;
  index: number;
  incorrectCount: number;
};

/**
 * An action that can affect the game state
 */
type GameStateAction = NewWordAction | KeyInputAction;

/**
 * Used when a new word arrives from the server
 */
type NewWordAction = {
  type: "New Word";
  word: string;
};

/**
 * Used when a new key is input
 */
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
const reducer = (state: GameState, action: GameStateAction): GameState => {
  switch (action.type) {
    case "New Word":
      return {
        index: 0,
        incorrectCount: 0,
        word: action.word,
      };
    case "Key Input":
      if (state.word === "") {
        return { ...state };
      }

      const correct =
        action.key === state.word[state.index] && state.incorrectCount === 0;

      if (correct) {
        return {
          ...state,
          index: state.index + 1,
        };
      } else {
        return {
          ...state,
          incorrectCount:
            action.key === "Backspace"
              ? Math.max(state.incorrectCount - 1, 0)
              : state.incorrectCount + 1,
        };
      }
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
const useGameServer = (): GameState => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8080"
  );

  const [state, dispatch] = useReducer(reducer, {
    word: "",
    index: 0,
    incorrectCount: 0,
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (state.word !== null && readyState === ReadyState.OPEN) {
        sendMessage(event.key);

        dispatch({ type: "Key Input", key: event.key });
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [state.word, readyState]);

  return state;
};

/**
 * A React Component that displays the Game Scene, overlayed with the Game HUD
 */
export const Game: React.FC = () => {
  const { word, index, incorrectCount } = useGameServer();

  return (
    <div>
      <div className={styles.game}>
        <GameScene />
      </div>
      <div className={styles.hud}>
        <HUD
          word={word.toUpperCase()}
          index={index}
          incorrectCount={incorrectCount}
        />
      </div>
    </div>
  );
};

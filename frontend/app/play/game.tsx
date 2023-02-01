"use client";

import React, { useEffect, useState } from "react";
import { HUD } from "./hud";
import { GameScene } from "./scene";
import styles from "./styles.module.css";

let savedSocket: WebSocket | undefined = undefined;

const useGameServer = () => {
  if (savedSocket === undefined) {
    savedSocket = new WebSocket("ws://localhost:8080");
  }

  const socket = savedSocket as WebSocket;

  const [word, setWord] = useState<string | undefined>(undefined);

  socket.onmessage = (message) => setWord(message.data);

  const onKeyDown = (event: KeyboardEvent) => {
    if (socket.readyState === socket.OPEN) {
      socket.send(event.key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return { word };
};

export const Game: React.FC = () => {
  const { word } = useGameServer();

  return (
    <div>
      <div className={styles.game}>
        <GameScene />
      </div>
      <div className={styles.hud}>
        <HUD word={word} />
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { HUD } from "./hud";
import { GameScene } from "./scene";
import styles from "./styles.module.css";
import { useMultiplayerGame, useWordState } from "./state";

export const MultiplayerGame: React.FC = () => {
  const { wordList, sendKeyInput } = useMultiplayerGame();

  if (wordList === null) {
    return null;
  }

  return <Game wordList={wordList} sendKeyInput={sendKeyInput} />;
};

/**
 * A React Component that displays the Game Scene, overlayed with the Game HUD
 */
export const Game: React.FC<{
  wordList: string[];
  sendKeyInput: (key: string) => void;
}> = ({ wordList, sendKeyInput }) => {
  const { word, characterIndex, incorrectCharacterCount } = useWordState({
    wordList,
    sendKeyInput,
  });

  return (
    <div>
      <div className={styles.game}>
        <GameScene />
      </div>
      <div className={styles.hud}>
        <HUD
          word={word.toUpperCase()}
          characterIndex={characterIndex}
          incorrectCharacterCount={incorrectCharacterCount}
        />
      </div>
    </div>
  );
};

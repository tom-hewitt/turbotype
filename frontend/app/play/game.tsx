"use client";

import React from "react";
import { HUD } from "./hud";
import { GameScene } from "./scene";
import styles from "./styles.module.css";
import { useGameState } from "./state";

/**
 * A React Component that displays the Game Scene, overlayed with the Game HUD
 */
export const Game: React.FC = () => {
  const { word, index, incorrectCount } = useGameState();

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

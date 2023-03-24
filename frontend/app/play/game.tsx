"use client";

import { calculateFinishProgress } from "@turbotype/game";
import React, { useMemo } from "react";
import { HUD } from "./hud";
import { GameScene } from "./scene";
import styles from "./styles.module.css";
import { useWordState } from "./typing";
import { MultiplayerRaceState, useMultiplayerRace } from "./websocket";

export const MultiplayerGame: React.FC = () => {
  const { state, sendKeyInput } = useMultiplayerRace();

  if (state === null) {
    return <h1>Waiting for players...</h1>;
  }

  return <Game state={state} sendKeyInput={sendKeyInput} />;
};

/**
 * A React Component that displays the Game Scene, overlayed with the Game HUD
 */
export const Game: React.FC<{
  state: MultiplayerRaceState;
  sendKeyInput: (key: string) => void;
}> = ({
  state: { playerID, startTime, wordList, playerActions },
  sendKeyInput,
}) => {
  const state = useWordState({
    wordList,
    sendKeyInput,
    hasRaceStarted: () => Date.now() >= startTime,
  });

  const finishProgress = useMemo(
    () => calculateFinishProgress(wordList),
    [wordList]
  );

  console.log("finishProgress: ", finishProgress);

  return (
    <div>
      <div className={styles.game}>
        <GameScene
          playerID={playerID}
          playerActions={playerActions}
          finishProgress={finishProgress}
          state={state}
        />
      </div>
      <div className={styles.hud}>{/* <HUD state={state} /> */}</div>
    </div>
  );
};

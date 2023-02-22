"use client";

import { ACTION_PROGRESS_INCREASES, PlayerAction } from "@turbotype/game";
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
  const { word, characterIndex, incorrectCharacterCount } = useWordState({
    wordList,
    sendKeyInput,
    hasRaceStarted: () => Date.now() >= startTime,
  });

  // the progress needed to finish the race, equivalent to 2 * the number of characters in the wordlist
  const finishProgress = useMemo(
    () =>
      wordList.reduce(
        (sum, word) =>
          sum +
          (word.length - 1) *
            ACTION_PROGRESS_INCREASES[PlayerAction.CORRECT_LETTER] +
          ACTION_PROGRESS_INCREASES[PlayerAction.CORRECT_WORD],
        0
      ),
    [wordList]
  );

  return (
    <div>
      <div className={styles.game}>
        <GameScene
          playerID={playerID}
          playerActions={playerActions}
          finishProgress={finishProgress}
        />
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

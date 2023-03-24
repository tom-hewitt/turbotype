"use client";

import { TypingState } from "@turbotype/game";
import classNames from "classnames";
import React from "react";
import { anton } from "../../fonts";
import styles from "./styles.module.css";

export const HUD: React.FC<{
  state: TypingState;
}> = ({ state }) => {
  return <Word state={state} />;
};

const Word: React.FC<{
  state: TypingState;
}> = ({ state }) => {
  if (state === null) {
    return null;
  }

  const {
    word,
    characterIndex: index,
    incorrectCharacterCount: incorrectCount,
  } = state;

  const correctPart = word.substring(0, index);

  const incorrectPart = word
    // represent any incorrect characters exceeding the word length with a "-"
    .concat("-".repeat(Math.max(index + incorrectCount - word.length, 0)))
    .substring(index, index + incorrectCount);

  const remainingPart = word.substring(index + incorrectCount);

  return (
    <div>
      {word ? (
        <h1 className={classNames(anton.className, styles.word)}>
          <span className={styles.correct}>{correctPart}</span>
          <span className={styles.incorrect}>{incorrectPart}</span>
          <span>{remainingPart}</span>
        </h1>
      ) : null}
    </div>
  );
};

// const Speedometer: React.FC<{ speed: number }> = ({ speed }) => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.circle}>
//         <span className={styles.speedText}>{speed}</span>
//         <span className={styles.unitText}>wpm</span>
//       </div>
//     </div>
//   );
// };

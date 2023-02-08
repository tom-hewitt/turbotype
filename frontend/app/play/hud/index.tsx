"use client";

import classNames from "classnames";
import React from "react";
import { anton } from "../../layout";
import styles from "./styles.module.css";

export const HUD: React.FC<{
  word: string;
  characterIndex: number;
  incorrectCharacterCount: number;
}> = (props) => {
  return <Word {...props} />;
};

const Word: React.FC<{
  word: string;
  characterIndex: number;
  incorrectCharacterCount: number;
}> = ({
  word,
  characterIndex: index,
  incorrectCharacterCount: incorrectCount,
}) => {
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

function Square() {
  return <div className="square"></div>;
}

function Line() {
  return <hr style={{ border: "1px solid black", width: "100%" }} />;
  return <hr className="line" />;
}

// .square{
//   width: 100px;
//   height: 100px;
//   blackground-color: blue
// }

// .line{
//   border: 1px solid black;
//   width: 100%
// }

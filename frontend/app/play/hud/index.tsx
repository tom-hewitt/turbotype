"use client";

import classNames from "classnames";
import React, { useState } from "react";
import { anton } from "../../layout";
import styles from "./styles.module.css";


// import { StyleSheet } from "react-native";
// import classNames from "classnames";
// import React, { useState } from "react";
// import { anton } from "../../layout";
// import stylesHUD from "./styles.module.css";

// export const HUD: React.FC<{
//   word: string;
//   index: number;
//   incorrectCount: number;
// }> = (props) => {
//   return <Word {...props} />;
// };

// const Word: React.FC<{
//   word: string;
//   index: number;
//   incorrectCount: number;
// }> = ({ word, index, incorrectCount }) => {
//   const correctPart = word.substring(0, index);

//   const incorrectPart = word
//     // represent any incorrect characters exceeding the word length with a "-"
//     .concat("-".repeat(Math.max(index + incorrectCount - word.length, 0)))
//     .substring(index, index + incorrectCount);

//   const remainingPart = word.substring(index + incorrectCount);

//   return (
//     <div>
//       {word ? (
//         <h1 className={classNames(anton.className, stylesHUD.word)}>
//           <span className={stylesHUD.correct}>{correctPart}</span>
//           <span className={stylesHUD.incorrect}>{incorrectPart}</span>
//           <span>{remainingPart}</span>
//         </h1>
//       ) : null}
//     </div>
//   );
// };

// const Speedometer: React.FC<{ speed: number }> = ({ speed }) => {
//   return (
//     <div style={stylesHUD.container}>
//       <div style={stylesHUD.circle}>
//         <span style={stylesHUD.speedText}>{speed}</span>
//         <span style={stylesHUD.unitText}>wpm</span>
//       </div>
//     </div>
//   );
// };

// const Ranking = () => {
//   const [ranking, setRanking] = useState(1);

//   const handleRankingChange = (newRanking: number) => {
//     setRanking(newRanking);
//   };

//   return (
//     <div style={stylesRanking.container}>
//       <span style={stylesRanking.rankingText}>
//         {ranking}{" "}
//         {ranking === 1
//           ? "st"
//           : ranking === 2
//           ? "nd"
//           : ranking === 3
//           ? "rd"
//           : "th"}{" "}
//         Place
//       </span>
//     </div>
//   );
// };

// const stylesRanking = StyleSheet.create({
//   container: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   rankingText: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
// });

// export { Speedometer, Ranking };

// class MiniMap {
//   private roadWidth = 20;
//   private roadLength = 100;
//   private playerPosition = 0;

//   public draw() {
//     const centerX = this.roadWidth / 2;


export const HUD: React.FC<{
  word: string;
  index: number;
  incorrectCount: number;
}> = (props) => {
  return <Word {...props} />;
};

const Word: React.FC<{
  word: string;
  index: number;
  incorrectCount: number;
}> = ({ word, index, incorrectCount }) => {
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


const Speedometer: React.FC<{ speed: number }> = ({ speed }) => {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <span className={styles.speedText}>{speed}</span>
        <span className={styles.unitText}>wpm</span>
      </div>
    </div>
  );
};

// const styles1 = StyleSheet.create({
//   container: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   circle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "lightgray",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   speedText: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   unitText: {
//     fontSize: 14,
//   },
// });

// export default Speedometer;





const Ranking = () => {
  const [ranking, setRanking] = useState(1);

  const handleRankingChange = (newRanking: number) => {
    setRanking(newRanking);
  };

  return (
    <div className={styles.container}>
      <span className={styles.rankingText}>
        {ranking}{" "}
        {ranking === 1
          ? "st"
          : ranking === 2
          ? "nd"
          : ranking === 3
          ? "rd"
          : "th"}{" "}
        Place
      </span>
    </div>
  );
};


class MiniMap {
    private roadWidth = 20;
    private roadLength = 100;
    private playerPosition = 0;
  
    public draw() {
      const centerX = this.roadWidth / 2;
      const centerY = this.roadLength / 2;
      const radius = centerY - this.roadWidth;
  
      // draw circle
      this.drawCircle(centerX, centerY, radius);
  
      // draw road
      this.drawRoad(centerX, centerY);
  
      // draw player
      this.drawPlayer(centerX, centerY, this.playerPosition);
    }
  
    private drawCircle(x: number, y: number, r: number) {
      // code to draw a circle
    }
  
    private drawRoad(x: number, y: number) {
      // code to draw two vertical side-by-side lines
    }
  
    private drawPlayer(x: number, y: number, position: number) {
      // code to draw a red dot at the given position on the road
    }
  
    public updatePlayerPosition(newPosition: number) {
      this.playerPosition = newPosition;
      this.draw();
    }
  }


class Speedometer1 {
    private speed = 0;
    container: any;
  
    public draw() {
      const centerX = this.container.width / 2;
      const centerY = this.container.height / 2;
      const radius = Math.min(centerX, centerY);
  
      // draw circle
      this.drawCircle(centerX, centerY, radius);
  
      // draw speed
      this.drawSpeed(centerX, centerY, this.speed);
    }
  
    private drawCircle(x: number, y: number, r: number) {
      // code to draw a circle
    }
  
    private drawSpeed(x: number, y: number, speed: number) {
      // code to draw the speed inside the circle
    }
  
    public updateSpeed(newSpeed: number) {
      this.speed = newSpeed;
      this.draw();
    }
  }


class GameRanking {
  
    public draw() {
      // code to draw the ranking in the top right corner
    }
  
    public updateRanking(newRanking: number) {
      this.draw();
    }
  }
  

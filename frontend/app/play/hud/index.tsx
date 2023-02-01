"use client";

import React from "react";

export const HUD: React.FC<{ word?: string }> = ({ word }) => {
  return <div>{word ? <h1>{word}</h1> : null}</div>;
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

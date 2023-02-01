"use client";

import { Canvas } from "@react-three/fiber";
import React from "react";
import { RaceCar } from "../../components/models/racecar";

export const GameScene: React.FC = () => {
  return (
    <Canvas>
      <RaceCar />
    </Canvas>
  );
};

"use client";

import { Sky, Cloud, PerspectiveCamera } from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import { PlayerAction } from "@turbotype/game";
import React from "react";
import { RaceCar } from "../../components/models/racecar";
import { useProgress } from "./typing";
import { motion as motion3d } from "framer-motion-3d";
import "./styles.module.css";

const PROGRESS_MULTIPLIER = 10;

const CAR_SEPARATION = 2;

export const Player: React.FC<{
  actions: PlayerAction[];
  self: boolean;
  x: number;
}> = ({ actions, self, x }) => {
  const progress = useProgress(actions);

  console.log("progress:", progress);

  return (
    <motion3d.group
      animate={{ z: -[progress * PROGRESS_MULTIPLIER] }}
      transition={{ ease: "easeOut", duration: 2 }}
      position={[x, 0, 0]}
    >
      <RaceCar position={[0, -3, 0]} castShadow />
      {self ? <PerspectiveCamera position={[0, -2, 5]} makeDefault /> : null}
    </motion3d.group>
  );
};

export const GameScene: React.FC<{
  playerID: number;
  playerActions: PlayerAction[][];
  finishProgress: number;
}> = ({ playerID, playerActions, finishProgress }) => {
  const startX = -((playerActions.length - 1) / 2);

  return (
    <Canvas>
      {playerActions.map((actions, id) => (
        <Player
          key={id}
          actions={actions}
          self={id === playerID}
          x={(startX + id) * CAR_SEPARATION}
        />
      ))}

      <Map finishProgress={finishProgress} />
    </Canvas>
  );
};

export const Map: React.FC<{ finishProgress: number }> = ({
  finishProgress,
}) => {
  const raceLength = finishProgress * PROGRESS_MULTIPLIER;

  console.log(finishProgress);

  return (
    <group>
      <ambientLight intensity={0.5} />
      <Road length={raceLength} />
      <FinishLine position={[0, 0, -raceLength]} />
      <Sky sunPosition={[7, 5, 1]} />
      <Cloud opacity={0.5} speed={0.4} width={200} depth={0} segments={200} />
      <spotLight position={[10, 15, 10]} angle={10} />
    </group>
  );
};

export const Road: React.FC<{ length: number }> = ({ length }) => {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3, -(length / 2)]}
        receiveShadow
      >
        <planeGeometry args={[20, length]} />
        <meshPhysicalMaterial
          attach="material"
          color="#e5a25e"
          metalness={0.2}
        />
      </mesh>
      {Array.from({ length: 100 }, (_, i) => (
        <RoadLine key={i} position={[0, -2.9, -i * 6]} />
      ))}
    </group>
  );
};

export const RoadLine: React.FC<{ position: Vector3 }> = ({ position }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} receiveShadow>
      <planeGeometry args={[0.5, 2]} />
      <meshPhysicalMaterial attach="material" color="white" metalness={0.2} />
    </mesh>
  );
};

export const FinishLine: React.FC<{ position: Vector3 }> = ({ position }) => {
  return (
    <mesh position={position}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  );
};

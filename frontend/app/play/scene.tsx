"use client";

import { Sky, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PlayerAction } from "@turbotype/game";
import React, { useEffect, useRef } from "react";
import { RaceCar } from "../../components/models/racecar";
import { useProgress } from "./typing";
import "./styles.module.css";
import { Map_1 } from "../../components/models/map_1";
import {
  BufferGeometry,
  CatmullRomCurve3,
  LineBasicMaterial,
  LineLoop,
  Vector3,
} from "three";
import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";

const CURVE = new CatmullRomCurve3(
  [
    new Vector3(0, 0, 0),
    new Vector3(0, 0, -50),
    new Vector3(-50, 0, -50),
    new Vector3(0, 0, 50),
  ],
  true,
  "centripetal"
);

const line = new LineLoop(
  new BufferGeometry().setFromPoints(CURVE.getPoints(50)),
  new LineBasicMaterial({ color: 0xff0000 })
);

export const Player: React.FC<{
  actions: PlayerAction[];
  self: boolean;
  curve: CatmullRomCurve3;
  finishProgress: number;
}> = ({ actions, self, curve, finishProgress }) => {
  const progress = useProgress(actions);

  return (
    <CurveFollower progress={progress / finishProgress} curve={curve}>
      <group>
        <RaceCar position={[0, 0, 0]} castShadow />
        {self ? <PerspectiveCamera position={[0, 1, 5]} makeDefault /> : null}
      </group>
    </CurveFollower>
  );
};

export const CurveFollower: React.FC<{
  progress: number;
  curve: CatmullRomCurve3;
  children: React.ReactNode;
}> = ({ progress, curve, children }) => {
  const ref = useRef<THREE.Group | null>(null);

  const animatedProgress = useMotionValue(progress);

  useMotionValueEvent(animatedProgress, "change", (latest) => {
    if (ref.current) {
      const position = curve.getPointAt(latest % 1);

      ref.current.position.copy(position);

      const tangent = curve.getTangentAt((latest + 0.001) % 1);

      ref.current.lookAt(tangent.add(position));

      ref.current.rotation.y += Math.PI;
    }
  });

  useEffect(() => {
    animate(animatedProgress, progress, {
      duration: 3,
      ease: "easeOut",
    });
  }, [progress]);

  return <group ref={ref}>{children}</group>;
};

export const GameScene: React.FC<{
  playerID: number;
  playerActions: PlayerAction[][];
  finishProgress: number;
}> = ({ playerID, playerActions, finishProgress }) => {
  return (
    <Canvas>
      {playerActions.map((actions, id) => (
        <Player
          key={id}
          actions={actions}
          self={id === playerID}
          curve={CURVE}
          finishProgress={finishProgress}
          // x={(startX + id) * CAR_SEPARATION}
        />
      ))}

      <primitive object={line} />

      <Map_1 position={[0, -2, 0]} scale={10} />
      <ambientLight intensity={0.5} />
      <Sky sunPosition={[7, 5, 1]} />
      <spotLight position={[10, 15, 10]} angle={10} />
    </Canvas>
  );
};

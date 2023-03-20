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

    //car 3
    new Vector3(0, 0, 0),
    new Vector3(0, 0, -30),
    new Vector3(0, 0, -50),
    new Vector3(-3, 0, -57),
    new Vector3(-10, 0, -60),
    new Vector3(-50, 0, -60),
    new Vector3(-57, 0, -63),
    new Vector3(-60, 0, -70),
    new Vector3(-57, 0, -77),
    new Vector3(-50, 0, -80),
    new Vector3(-30, 0, -80),
    new Vector3(-23, 0, -83),
    new Vector3(-20, 0, -90),
    new Vector3(-17, 0, -97),
    new Vector3(-10, 0, -100),
    new Vector3(10, 0, -100),
    new Vector3(17, 0, -97),
    new Vector3(20, 0, -90),
    new Vector3(23, 0, -83),
    new Vector3(30, 0, -80),
    new Vector3(37, 0, -77),
    new Vector3(40, 0, -70),
    new Vector3(40, 0, -30),
    new Vector3(37, 0, -23),
    new Vector3(30, 0, -20),
    new Vector3(23, 0, -17),
    new Vector3(20, 0, -10),
    new Vector3(23, 0, -3),
    new Vector3(30, 0, 0),
    new Vector3(70, 0, 0),
    new Vector3(77, 0, 3),
    new Vector3(80, 0, 10),
    new Vector3(80, 0, 30),
    new Vector3(77, 0, 37),
    new Vector3(70, 0, 40),
    new Vector3(63, 0, 43),
    new Vector3(60, 0, 50),
    new Vector3(57, 0, 57),
    new Vector3(50, 0, 60),
    new Vector3(20, 0, 60),
    new Vector3(-10, 0, 60),
    new Vector3(-17, 0, 57),
    new Vector3(-20, 0, 50),
    new Vector3(-23, 0, 43),
    new Vector3(-30, 0, 40),
    new Vector3(-50, 0, 40),
    new Vector3(-57, 0, 37),
    new Vector3(-60, 0, 30),
    new Vector3(-60, 0, 10),
    new Vector3(-57, 0, 3),
    new Vector3(-50, 0, 0),
    new Vector3(-43, 0, -3),
    new Vector3(-40, 0, -10),
    new Vector3(-37, 0, -17),
    new Vector3(-30, 0, -20),
    new Vector3(-23, 0, -17),
    new Vector3(-20, 0, -10),
    new Vector3(-20, 0, 10),
    new Vector3(-17, 0, 17),
    new Vector3(-10, 0, 20),
    new Vector3(-3, 0, 17),
    new Vector3(0, 0, 10),
    new Vector3(0, 0, 0),





  ],
  true,
  "centripetal"
);

const line = new LineLoop(
  new BufferGeometry().setFromPoints(CURVE.getPoints(200)),
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
    
    <Canvas >
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

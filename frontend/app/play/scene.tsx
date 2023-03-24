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

const CURVES = [
  new CatmullRomCurve3(
    [
      //car 1
      new Vector3(-7, 0, 0),
      new Vector3(-7, 0, -20),
      new Vector3(-7, 0, -40),
      new Vector3(-7, 0, -50),
      new Vector3(-10, 0, -53),
      new Vector3(-30, 0, -53),
      new Vector3(-50, 0, -53),
      new Vector3(-58.5, 0, -55.3),
      new Vector3(-64.7, 0, -61.5),
      new Vector3(-67, 0, -70),
      new Vector3(-64.7, 0, -78.5),
      new Vector3(-58.5, 0, -84.7),
      new Vector3(-50, 0, -87),
      new Vector3(-30, 0, -87),
      new Vector3(-27, 0, -90),
      new Vector3(-24.7, 0, -98.5),
      new Vector3(-18.5, 0, -104.7),
      new Vector3(-10, 0, -107),
      new Vector3(10, 0, -107),
      new Vector3(18.5, 0, -104.7),
      new Vector3(24.7, 0, -98.5),
      new Vector3(27, 0, -90),
      new Vector3(30, 0, -87),
      new Vector3(38.5, 0, -84.7),
      new Vector3(44.7, 0, -78.5),
      new Vector3(47, 0, -70),
      new Vector3(47, 0, -50),
      new Vector3(47, 0, -30),
      new Vector3(44.7, 0, -21.5),
      new Vector3(38.5, 0, -15.3),
      new Vector3(30, 0, -13),
      new Vector3(27, 0, -10),
      new Vector3(30, 0, -7),
      new Vector3(70, 0, -7),
      new Vector3(78.5, 0, -4.7),
      new Vector3(84.7, 0, 1.5),
      new Vector3(87, 0, 10),
      new Vector3(87, 0, 30),
      new Vector3(84.7, 0, 38.5),
      new Vector3(78.5, 0, 44.7),
      new Vector3(70, 0, 47),
      new Vector3(67, 0, 50),
      new Vector3(64.7, 0, 58.5),
      new Vector3(58.5, 0, 64.7),
      new Vector3(50, 0, 67),
      new Vector3(20, 0, 67),
      new Vector3(-10, 0, 67),
      new Vector3(-18.5, 0, 64.7),
      new Vector3(-24.7, 0, 58.5),
      new Vector3(-27, 0, 50),
      new Vector3(-30, 0, 47),
      new Vector3(-50, 0, 47),
      new Vector3(-58.5, 0, 44.7),
      new Vector3(-64.7, 0, 38.5),
      new Vector3(-67, 0, 30),
      new Vector3(-67, 0, 10),
      new Vector3(-64.7, 0, 1.5),
      new Vector3(-58.5, 0, -4.7),
      new Vector3(-50, 0, -7),
      new Vector3(-47, 0, -10),
      new Vector3(-44.7, 0, -18.5),
      new Vector3(-38.5, 0, -24.7),
      new Vector3(-30, 0, -27),
      new Vector3(-21.5, 0, -24.7),
      new Vector3(-15.3, 0, -18.5),
      new Vector3(-13, 0, -10),
      new Vector3(-13, 0, 10),
      new Vector3(-10, 0, 13),
      new Vector3(-7, 0, 10),
      new Vector3(-7, 0, 0),
    ],
    true,
    "centripetal"
  ),
  new CatmullRomCurve3(
    [
      //car 2
      new Vector3(-3.5, 0, 0),
      new Vector3(-3.5, 0, -30),
      new Vector3(-3.5, 0, -50),
      new Vector3(-5.4, 0, -54.6),
      new Vector3(-10, 0, -56.5),
      new Vector3(-50, 0, -56.5),
      new Vector3(-59.5, 0, -60.5),
      new Vector3(-63.5, 0, -70),
      new Vector3(-59.5, 0, -79.5),
      new Vector3(-50, 0, -83.5),
      new Vector3(-30, 0, -83.5),
      new Vector3(-25.4, 0, -85.4),
      new Vector3(-23.5, 0, -90),
      new Vector3(-19.5, 0, -99.5),
      new Vector3(-10, 0, -103.5),
      new Vector3(10, 0, -103.5),
      new Vector3(19.5, 0, -99.5),
      new Vector3(23.5, 0, -90),
      new Vector3(25.4, 0, -85.4),
      new Vector3(30, 0, -83.5),
      new Vector3(39.5, 0, -79.5),
      new Vector3(43.5, 0, -70),
      new Vector3(43.5, 0, -30),
      new Vector3(39.5, 0, -20.5),
      new Vector3(30, 0, -16.5),
      new Vector3(25.4, 0, -14.6),
      new Vector3(23.5, 0, -10),
      new Vector3(25.4, 0, -5.4),
      new Vector3(30, 0, -3.5),
      new Vector3(70, 0, -3.5),
      new Vector3(79.5, 0, 0.5),
      new Vector3(83.5, 0, 10),
      new Vector3(83.5, 0, 30),
      new Vector3(79.5, 0, 39.5),
      new Vector3(70, 0, 43.5),
      new Vector3(65.4, 0, 45.4),
      new Vector3(63.5, 0, 50),
      new Vector3(59.5, 0, 59.5),
      new Vector3(50, 0, 63.5),
      new Vector3(20, 0, 63.5),
      new Vector3(-10, 0, 63.5),
      new Vector3(-19.5, 0, 59.5),
      new Vector3(-23.5, 0, 50),
      new Vector3(-25.4, 0, 45.4),
      new Vector3(-30, 0, 43.5),
      new Vector3(-50, 0, 43.5),
      new Vector3(-59.5, 0, 39.5),
      new Vector3(-63.5, 0, 30),
      new Vector3(-63.5, 0, 10),
      new Vector3(-59.5, 0, 0.5),
      new Vector3(-50, 0, -3.5),
      new Vector3(-45.4, 0, -5.4),
      new Vector3(-43.5, 0, -10),
      new Vector3(-39.5, 0, -19.5),
      new Vector3(-30, 0, -23.5),
      new Vector3(-20.5, 0, -19.5),
      new Vector3(-16.5, 0, -10),
      new Vector3(-16.5, 0, 10),
      new Vector3(-14.6, 0, 14.6),
      new Vector3(-10, 0, 16.5),
      new Vector3(-5.4, 0, 14.6),
      new Vector3(-3.5, 0, 10),
      new Vector3(-3.5, 0, 0),
    ],
    true,
    "centripetal"
  ),
  new CatmullRomCurve3(
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
  ),
  new CatmullRomCurve3(
    [
      //car 4
      new Vector3(3.5, 0, 0),
      new Vector3(3.5, 0, -30),
      new Vector3(3.5, 0, -50),
      new Vector3(-0.5, 0, -59.5),
      new Vector3(-10, 0, -63.5),
      new Vector3(-50, 0, -63.5),
      new Vector3(-54.6, 0, -65.4),
      new Vector3(-56.5, 0, -70),
      new Vector3(-54.6, 0, -74.6),
      new Vector3(-50, 0, -76.5),
      new Vector3(-30, 0, -76.5),
      new Vector3(-20.5, 0, -80.5),
      new Vector3(-16.5, 0, -90),
      new Vector3(-14.6, 0, -94.6),
      new Vector3(-10, 0, -96.5),
      new Vector3(10, 0, -96.5),
      new Vector3(14.6, 0, -94.6),
      new Vector3(16.5, 0, -90),
      new Vector3(20.5, 0, -80.5),
      new Vector3(30, 0, -76.5),
      new Vector3(34.6, 0, -74.6),
      new Vector3(36.5, 0, -70),
      new Vector3(36.5, 0, -30),
      new Vector3(34.6, 0, -25.4),
      new Vector3(30, 0, -23.5),
      new Vector3(20.5, 0, -19.5),
      new Vector3(16.5, 0, -10),
      new Vector3(20.5, 0, -0.5),
      new Vector3(30, 0, 3.5),
      new Vector3(70, 0, 3.5),
      new Vector3(74.6, 0, 5.4),
      new Vector3(76.5, 0, 10),
      new Vector3(76.5, 0, 30),
      new Vector3(74.6, 0, 34.6),
      new Vector3(70, 0, 36.5),
      new Vector3(60.5, 0, 40.5),
      new Vector3(56.5, 0, 50),
      new Vector3(54.6, 0, 54.6),
      new Vector3(50, 0, 56.5),
      new Vector3(20, 0, 56.5),
      new Vector3(-10, 0, 56.5),
      new Vector3(-14.6, 0, 54.6),
      new Vector3(-16.5, 0, 50),
      new Vector3(-20.5, 0, 40.5),
      new Vector3(-30, 0, 36.5),
      new Vector3(-50, 0, 36.5),
      new Vector3(-54.6, 0, 34.6),
      new Vector3(-56.5, 0, 30),
      new Vector3(-56.5, 0, 10),
      new Vector3(-54.6, 0, 5.4),
      new Vector3(-50, 0, 3.5),
      new Vector3(-40.5, 0, -0.5),
      new Vector3(-36.5, 0, -10),
      new Vector3(-34.6, 0, -14.6),
      new Vector3(-30, 0, -16.5),
      new Vector3(-25.4, 0, -14.6),
      new Vector3(-23.5, 0, -10),
      new Vector3(-23.5, 0, 10),
      new Vector3(-19.5, 0, 19.5),
      new Vector3(-10, 0, 23.5),
      new Vector3(-0.5, 0, 19.5),
      new Vector3(3.5, 0, 10),
      new Vector3(3.5, 0, 0),
    ],
    true,
    "centripetal"
  ),
  new CatmullRomCurve3(
    [
      //car 5
      new Vector3(7, 0, 0),
      new Vector3(7, 0, -20),
      new Vector3(7, 0, -40),
      new Vector3(7, 0, -50),
      new Vector3(4.7, 0, -58.5),
      new Vector3(-1.5, 0, -64.7),
      new Vector3(-10, 0, -67),
      new Vector3(-30, 0, -67),
      new Vector3(-50, 0, -67),
      new Vector3(-53, 0, -70),
      new Vector3(-50, 0, -73),
      new Vector3(-30, 0, -73),
      new Vector3(-21.5, 0, -75.3),
      new Vector3(-15.3, 0, -81.5),
      new Vector3(-13, 0, -90),
      new Vector3(-10, 0, -93),
      new Vector3(10, 0, -93),
      new Vector3(13, 0, -90),
      new Vector3(15.3, 0, -81.5),
      new Vector3(21.5, 0, -75.3),
      new Vector3(30, 0, -73),
      new Vector3(33, 0, -70),
      new Vector3(33, 0, -50),
      new Vector3(33, 0, -30),
      new Vector3(30, 0, -27),
      new Vector3(21.5, 0, -24.7),
      new Vector3(15.3, 0, -18.5),
      new Vector3(13, 0, -10),
      new Vector3(15.3, 0, -1.5),
      new Vector3(21.5, 0, 4.7),
      new Vector3(30, 0, 7),
      new Vector3(70, 0, 7),
      new Vector3(73, 0, 10),
      new Vector3(73, 0, 30),
      new Vector3(70, 0, 33),
      new Vector3(61.5, 0, 35.3),
      new Vector3(55.3, 0, 41.5),
      new Vector3(53, 0, 50),
      new Vector3(50, 0, 53),
      new Vector3(20, 0, 53),
      new Vector3(-10, 0, 53),
      new Vector3(-13, 0, 50),
      new Vector3(-15.3, 0, 41.5),
      new Vector3(-21.5, 0, 35.3),
      new Vector3(-30, 0, 33),
      new Vector3(-50, 0, 33),
      new Vector3(-53, 0, 30),
      new Vector3(-53, 0, 28),
      new Vector3(-53, 0, 17),
      new Vector3(-53, 0, 10),
      new Vector3(-50, 0, 7),
      new Vector3(-41.5, 0, 4.7),
      new Vector3(-35.3, 0, -1.5),
      new Vector3(-33, 0, -10),
      new Vector3(-30, 0, -13),
      new Vector3(-27, 0, -10),
      new Vector3(-27, 0, 10),
      new Vector3(-24.7, 0, 18.5),
      new Vector3(-18.5, 0, 24.7),
      new Vector3(-10, 0, 27),
      new Vector3(-1.5, 0, 24.7),
      new Vector3(4.7, 0, 18.5),
      new Vector3(7, 0, 10),
      new Vector3(7, 0, 0),
    ],
    true,
    "centripetal"
  ),
];

// const lines = new LineLoop(
//   new BufferGeometry().setFromPoints(CURVE1.getPoints(200)),
//   new LineBasicMaterial({ color: 0xff0000 })
// );
// const line2 = new LineLoop(
//   new BufferGeometry().setFromPoints(CURVE2.getPoints(200)),
//   new LineBasicMaterial({ color: 0xff0000 })
// );
// const line3 = new LineLoop(
//   new BufferGeometry().setFromPoints(CURVE3.getPoints(200)),
//   new LineBasicMaterial({ color: 0xff0000 })
// );
// const line4 = new LineLoop(
//   new BufferGeometry().setFromPoints(CURVE4.getPoints(200)),
//   new LineBasicMaterial({ color: 0xff0000 })
// );
// const line5 = new LineLoop(
//   new BufferGeometry().setFromPoints(CURVE5.getPoints(200)),
//   new LineBasicMaterial({ color: 0xff0000 })
// );

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
      const position = curve.getPointAt(latest);

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
    <Canvas camera={{ position: [0, 200, 0], fov: 70, zoom: 1 }}>
      {playerActions.map((actions, id) => (
        <Player
          key={id}
          actions={actions}
          self={id === playerID}
          curve={CURVES[id]!}
          finishProgress={finishProgress}
          // x={(startX + id) * CAR_SEPARATION}
        />
      ))}

      {/* <primitive object={line1} /> */}

      <Map_1 position={[0, -2, 0]} scale={10} />
      <ambientLight intensity={0.5} />
      <Sky sunPosition={[7, 5, 1]} />
      <spotLight position={[10, 15, 10]} angle={10} />
    </Canvas>
  );
};

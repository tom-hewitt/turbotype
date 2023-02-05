"use client";

import { Sky, Cloud} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { RaceCar } from "../../components/models/racecar";
import "./styles.module.css"

export const GameScene: React.FC = () => {
  return (
    <Canvas camera={{position: [0, -2, 15], fov: 70}}>
      <ambientLight intensity={0.5}/>
      <RaceCar position={[0, -3, 12.5]} />
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 500]} />
        <meshStandardMaterial attach="material" color="#e5a25e" metalness={0.2} />
      </mesh>
      <mesh>
        <Sky sunPosition={[7, 5, 1]} />
        <Cloud
          opacity={0.5}
          speed={0.4}
          width={200}
          depth={0}
          segments={200}
        />
      </mesh>
      <spotLight position={[10, 15, 10]} angle={10} />
    </Canvas>
  );
};

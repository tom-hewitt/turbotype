"use client";

import { Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { RaceCar } from "../../components/models/racecar";
import styles from "./styles.module.css";
import { createClient } from "../../database/server";
import { Database } from "../../database/types";

export const Editor: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState("#b51414");
    const handleSaveClick = () => {}

    return <><div className={styles.container}>
    <HexColorPicker color={selectedColor} onChange={setSelectedColor}/>
  </div>
  <div className={styles.containertext}>
    <div className={styles.value} style={{ borderLeftColor: selectedColor }}>
      Current color is {selectedColor}
    </div>
  </div>
  <div className={styles.buttoncontainer}>
    <button className={styles.button} onClick={handleSaveClick}>
      save
    </button>
  </div>
  <div className={styles.canvas}>
    <Canvas camera={{
      fov: 25,
      position: [1.25, 0.75, 3.5],
      rotation: [-0.2, 0.3, 0.05],
    }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls
        enableZoom={false}
        maxDistance={6} 
        minDistance={6} />
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          floatingRange={[-0.15,0.15]}>
            <RaceCar color={selectedColor} rotation={[0.05, 1 * Math.PI, 0]} />
        </Float>
    </Canvas>
  </div></>;
}
"use client";

import { Canvas, Euler, Vector3 } from "@react-three/fiber";
import classNames from "classnames";
import { motion } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import Link from "next/link";
import React, { useState } from "react";
import { Stopwatch } from "../components/models/stopwatch";
import { RaceCar } from "../components/models/racecar";
import { Gear } from "../components/models/gear";
import { RaceFlag } from "../components/models/raceflag";
import { Crown } from "../components/models/crown";
import { Trophy } from "../components/models/trophy";
import { PaintBucket } from "../components/models/paintbucket";
import { anton, inter } from "./fonts";
import styles from "./styles.module.css";
import { Environment } from "@react-three/drei";

export const HomeGridItem: React.FC<{
  name: string;
  subheading?: string;
  href: string;
  fractionalHeight: number;
  darkText?: boolean;
  largeText?: boolean;
  background: string;
  camera?: { fov: number; position: Vector3; rotation: Euler };
  model: React.FC<{
    isHovered: boolean;
  }>;
}> = ({
  name,
  subheading,
  href,
  fractionalHeight: flexGrow,
  background,
  darkText = false,
  largeText = false,
  camera,
  model,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const textBackground = darkText
    ? "linear-gradient(to top, #70400d, #281502)"
    : `linear-gradient(to top, ${background}, white)`;

  return (
    <Link
      href={href}
      className={styles.itemContainer}
      style={{ flexGrow }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={styles.item}
        style={{
          background,
          paddingTop: largeText ? 5 : 20,
        }}
        variants={{
          initial: {
            scale: 1,
          },
          hover: {
            scale: 0.95,
          },
        }}
        animate={isHovered ? "hover" : "initial"}
      >
        <h1
          style={{
            fontSize: largeText ? 100 : 50,
            background: textBackground,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
          className={classNames(styles.title, anton.className)}
        >
          {name}
        </h1>
        {subheading ? (
          <h2
            style={
              darkText
                ? {
                    background: textBackground,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }
                : { color: "rgba(255, 255, 255, 0.6)" }
            }
            className={classNames(styles.subheading, inter.className)}
          >
            {subheading}
          </h2>
        ) : null}
      </motion.div>
      <div className={styles.canvas}>
        <Canvas style={{ pointerEvents: "none" }} camera={camera}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {model({ isHovered })}
        </Canvas>
      </div>
    </Link>
  );
};

export const PlayButton: React.FC<{ fractionalHeight: number }> = ({
  fractionalHeight,
}) => (
  <HomeGridItem
    name="PLAY"
    subheading="join an online race"
    href="/play"
    fractionalHeight={fractionalHeight}
    largeText
    background="#FB6A6A"
    camera={{
      fov: 45,
      position: [1.1, 0.65, 3],
      rotation: [-0.2, 0.3, -0.15],
    }}
    model={({ isHovered }) => (
      <motion3d.group
        transition={{ ease: "easeIn" }}
        variants={{
          initial: {
            z: 0,
            rotateY: 0,
            transition: { ease: "linear", duration: 0.1 },
          },
          hover: {
            z: 0.1,
            rotateY: -0.025,
            transition: { ease: "easeOut", duration: 0.1 },
          },
        }}
        animate={isHovered ? "hover" : "initial"}
      >
        <RaceCar rotation={[0, 1 * Math.PI, 0]} />
      </motion3d.group>
    )}
  />
);

export const TournamentsButton: React.FC<{ fractionalHeight: number }> = ({
  fractionalHeight,
}) => (
  <HomeGridItem
    name="TOURNAMENTS"
    subheading="fight for the trophy!"
    href="/tournaments"
    fractionalHeight={fractionalHeight}
    darkText
    background="linear-gradient(180deg, #EB7070 0%, #FFD89E 0.01%, #FBC16A 91.67%)"
    model={({ isHovered }) => (
      <motion3d.group
        variants={{
          initial: {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
          },
          hover: {
            rotateX: -0.2,
            rotateY: -0.4,
            scale: 1.05,
          },
        }}
        animate={isHovered ? "hover" : "initial"}
      >
        <Trophy scale={2.6} rotation={[0.6, 0.3, 0]} position={[-0.1, -0.6, 0]} />
      </motion3d.group>
    )}
  />
);

export const PracticeButton: React.FC<{ fractionalHeight: number }> = ({
  fractionalHeight,
}) => (
  <HomeGridItem
    name="PRACTICE"
    subheading="hone your skills"
    href="/practice"
    fractionalHeight={fractionalHeight}
    darkText
    background="#FFD8B3"
    model={({ isHovered }) => (
      <motion3d.group
        variants={{
          initial: {
            rotateX: 0,
            scale: 1,
          },
          hover: {
            rotateX: -0.4,
            scale: 1.05,
          },
        }}
        animate={isHovered ? "hover" : "initial"}
      >
        <Stopwatch scale={2} />
      </motion3d.group>
    )}
  />
);

export const CreateRaceButton: React.FC<{ fractionalHeight: number }> = ({
  fractionalHeight,
}) => (
  <HomeGridItem
    name="CREATE RACE"
    subheading="race with friends"
    href="/create"
    fractionalHeight={fractionalHeight}
    darkText
    background="#EFEFEF"
    model={({ isHovered }) => (
      <motion3d.group
        variants={{
          initial: {
            z: 0,
            rotateY: 0,
            rotateX: 0,
          },
          hover: {
            z: 0.4,
            rotateY: -0.05,
            rotateX: 0.3,
          },
        }}
        animate={isHovered ? "hover" : "initial"}
      >
        <RaceFlag scale={2.2} rotation={[0.25, 0.2, 0.2]} position={[-0.1, 0.4, 0]} />
      </motion3d.group>
    )}
  />
);

export const LeaderboardButton: React.FC<{ fractionalHeight: number }> = ({
  fractionalHeight,
}) => (
  <HomeGridItem
    name="LEADERBOARD"
    subheading="where do you rank?"
    href="/leaderboard"
    fractionalHeight={fractionalHeight}
    darkText
    background="#FFECE4"
    model={({ isHovered }) => (
        <motion3d.group
          variants={{
            initial: {
              rotateX: 0,
              scale: 1,
            },
            hover: {
              rotateX: 0.35,
              scale: 1.1,
            },
          }}
          animate={isHovered ? "hover" : "initial"}
        >
          {/* <ambientLight intensity={5} color="#ffe037" /> */}
          <pointLight position={[25, -5, 20]} intensity={10} color="#ffe037" />
          {/* <pointLight position={[-25, -5, 20]} intensity={10} color="#ffe037" /> */}
          <Crown scale={1.65} rotation={[0.1, -0.7, 0]} position={[0, 0, -2]} />
      </motion3d.group>
    )}
  />
);

export const CustomiseButton: React.FC<{ fractionalHeight: number }> = ({
  fractionalHeight,
}) => (
  <HomeGridItem
    name="CUSTOMISE"
    subheading="show off your style"
    href="/customise"
    fractionalHeight={fractionalHeight}
    background="#FFABB0"
    model={() => null}
  />
);

export const SettingsButton: React.FC<{ fractionalHeight: number }> = ({
  fractionalHeight,
}) => (
  <HomeGridItem
    name="SETTINGS"
    href="/customise"
    fractionalHeight={fractionalHeight}
    background="#6D6D6D"
    model={({ isHovered }) => (
      <motion3d.group
        variants={{
          initial: {
            rotateX: 0,
            z: 0,
            scale: 1,
          },
          hover: {
            rotateX: 0.4,
            z: 0.4,
            scale: 1.05,
          },
        }}
        animate={isHovered ? "hover" : "initial"}
      >
        <Gear scale={6.5} rotation={[-3.8, 1 * Math.PI, 1.7]} position={[-0.4, -0.1, 0]} />
      </motion3d.group>
    )}
  />
);

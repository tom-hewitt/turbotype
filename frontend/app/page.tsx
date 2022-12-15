import React from "react";
import styles from "./styles.module.css";
import classNames from 'classnames';
import Link from "next/link";
import { Logo } from "../components/logo";
import { ProfileIcon } from "../components/profileIcon";
import { Spacer } from "../components/spacer";
import { Text } from "../components/text";
import { anton } from "./layout";
import { inter } from "./layout";

import { Canvas } from "@react-three/fiber";
import Car from "../components/homepage3DAssets/car";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.pageTop}>
        <Link href="/">
          <Logo />
        </Link>
        <Spacer />
        <Link href="/profile/" className={styles.profile}>
          <span className={styles.profileName}>
            <Text>Adam</Text>
          </span>
          <ProfileIcon />
        </Link>
      </div>
      <div className={styles.wrapper}>
          <div className={classNames(styles.play, styles.rectangle, anton.className)}>
            <div className={classNames(anton.className, styles.rectangleTitle)}>PLAY</div>
            <div className={classNames(inter.className, styles.rectangleDesc)}>Join a race.</div>
            
          </div>
          <div className={classNames(styles.practice, styles.rectangle)}>
            <div className={classNames(anton.className, styles.rectangleTitle)}>PRACTICE</div>
            <div className={classNames(inter.className, styles.rectangleDesc)}>Hone your skills.</div>
          </div>
          <div className={classNames(styles.leaderboard, styles.rectangle)}>
            <div className={classNames(anton.className, styles.rectangleTitle)}>LEADERBOARD</div>
            <div className={classNames(inter.className, styles.rectangleDesc)}>Where do you rank?</div>
          </div>
          <div className={classNames(styles.tournaments, styles.rectangle)}>
            <div className={classNames(anton.className, styles.rectangleTitle)}>TOURNAMENTS</div>
            <div className={classNames(inter.className, styles.rectangleDesc)}>Compete against others!</div>
          </div>
          <div className={classNames(styles.create, styles.rectangle)}>
            <div className={classNames(anton.className, styles.rectangleTitle)}>CREATE RACE</div>
            <div className={classNames(inter.className, styles.rectangleDesc)}>Race with friends.</div>
          </div>
          <div className={classNames(styles.customise, styles.rectangle)}>
            <div className={classNames(anton.className, styles.rectangleTitle)}>CUSTOMISE</div>
            <div className={classNames(inter.className, styles.rectangleDesc)}>Show off your swag.</div>
          </div>
      </div>
    </div>
  );
}

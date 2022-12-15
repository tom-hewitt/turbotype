import React from "react";
import styles from "./styles.module.css";
import classNames from 'classnames';
import Link from "next/link";
import { Logo } from "../components/logo";
import { ProfileIcon } from "../components/profileIcon";
import { Spacer } from "../components/spacer";
import { Text } from "../components/text";

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
          <div className={classNames(styles.play, styles.rectangle)}>Play</div>
          <div className={classNames(styles.practice, styles.rectangle)}>Practice</div>
          <div className={classNames(styles.leaderboard, styles.rectangle)}>Leaderboard</div>
          <div className={classNames(styles.tournaments, styles.rectangle)}>Tournaments</div>
          <div className={classNames(styles.create, styles.rectangle)}>Create Race</div>
          <div className={classNames(styles.customise, styles.rectangle)}>Customise</div>               
      </div>
    </div>
  );
}

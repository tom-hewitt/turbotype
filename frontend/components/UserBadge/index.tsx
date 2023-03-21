"use client";

import Link from "next/link";
import { ProfileIcon } from "../profileIcon";
import { Text } from "../text";
import styles from "./styles.module.css";

export const UserBadge: React.FC<{ username: string }> = ({ username }) => {
  return (
    <Link href="/profile" className={styles.profile}>
      <span className={styles.profileName}>
        <Text>{username}</Text>
      </span>
      <ProfileIcon />
    </Link>
  );
};

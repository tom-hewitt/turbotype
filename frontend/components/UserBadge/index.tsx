"use client";

import Link from "next/link";
import { ProfileIcon } from "../profileIcon";
import { Text } from "../text";
import styles from "./styles.module.css";

export const UserBadge: React.FC<{ username: string; id: string; color: string }> = ({
  username,
  id,
  color,
}) => {
  return (
    <Link href={`/profile/${id}`} className={styles.profile}>
      <span className={styles.profileName}>
        <Text>{username}</Text>
      </span>
      <ProfileIcon color={color} />
    </Link>
  );
};

"use client";

import Link from "next/link";
import { useSupabase } from "../../database/provider";
import { ProfileIcon } from "../profileIcon";
import { Text } from "../text";
import styles from "./styles.module.css";

export const Profile: React.FC = () => {
  const { session } = useSupabase();

  return (
    <Link href={session ? "/profile" : "/login"} className={styles.profile}>
      <span className={styles.profileName}>
        <Text>{session?.user.email ? session.user.email : "Login"}</Text>
      </span>
      <ProfileIcon />
    </Link>
  );
};

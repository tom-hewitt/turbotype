"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import {
  CreateRaceButton,
  CustomiseButton,
  LeaderboardButton,
  PlayButton,
  PracticeButton,
  SettingsButton,
  TournamentsButton,
} from "./homeGridItem";
import { useSupabase } from "../database/provider";
import { Logo } from "../components/logo";
import { Spacer } from "../components/spacer";
import { UserBadge } from "../components/UserBadge";
import { LoginButton } from "../components/LoginButton";
import { SignUpModal } from "../components/SignUpModal";

const HomeGridColumn: React.FC<{
  fractionalWidth: number;
  children: React.ReactNode;
}> = ({ fractionalWidth: flex, children }) => {
  return (
    <div className={styles.column} style={{ flex }}>
      {children}
    </div>
  );
};

const HomeGrid: React.FC = () => {
  return (
    <div className={styles.grid}>
      <HomeGridColumn fractionalWidth={0.375}>
        <PlayButton fractionalHeight={0.7} />
        <TournamentsButton fractionalHeight={0.3} />
      </HomeGridColumn>
      <HomeGridColumn fractionalWidth={0.3}>
        <PracticeButton fractionalHeight={0.4} />
        <CreateRaceButton fractionalHeight={0.6} />
      </HomeGridColumn>
      <HomeGridColumn fractionalWidth={0.325}>
        <LeaderboardButton fractionalHeight={0.4} />
        <CustomiseButton fractionalHeight={0.5} />
        <SettingsButton fractionalHeight={0.1} />
      </HomeGridColumn>
    </div>
  );
};

const useUsername = (): string | null | undefined => {
  const { supabase, session } = useSupabase();

  const [username, setUsername] = useState<string | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!session) {
      setUsername(undefined);
      return;
    }

    supabase
      .from("accounts")
      .select("username")
      .then(({ data }) => setUsername(data?.[0] ? data[0].username : null));
  }, [supabase, session]);

  return username;
};

export default function Home() {
  const username = useUsername();

  console.log("username:", username);

  return (
    <div className={styles.page}>
      {username === null ? <SignUpModal /> : null}
      <nav className={styles.navbar}>
        <Logo />
        <Spacer />
        {username ? <UserBadge username={username} /> : <LoginButton />}
      </nav>
      <HomeGrid />
    </div>
  );
}

import React from "react";
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
import { HomeNavBar } from "../components/navbar";

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
        <PlayButton flex={0.7} />
        <TournamentsButton flex={0.3} />
      </HomeGridColumn>
      <HomeGridColumn fractionalWidth={0.3}>
        <PracticeButton flex={0.4} />
        <CreateRaceButton flex={0.6} />
      </HomeGridColumn>
      <HomeGridColumn fractionalWidth={0.325}>
        <LeaderboardButton flex={0.4} />
        <CustomiseButton flex={0.5} />
        <SettingsButton flex={0.1} />
      </HomeGridColumn>
    </div>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeNavBar />
      <HomeGrid />
    </div>
  );
}

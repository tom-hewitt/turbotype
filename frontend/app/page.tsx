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

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeNavBar />
      <HomeGrid />
    </div>
  );
}

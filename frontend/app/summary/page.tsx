"use client";

import React, { useState } from 'react';
import { Heading } from "../../components/heading";
import { Page } from "../../components/page";
import styles from "./styles.module.css";

interface User {
  rank: number;
  name: string;
  time: string;
  wpm: number;
}


const users: User[] = [
  { rank: 1, name: 'Tom', time: '02:28', wpm: 120 },
  { rank: 2, name: 'Adam', time: '02:40', wpm: 113 },
  { rank: 3, name: 'Jiamin', time: '03:00', wpm: 106 },
  { rank: 4, name: 'Kaman', time: '03:20', wpm: 100 },
  { rank: 5, name: 'Thivi', time: '03:38', wpm: 91 },
  { rank: 6, name: 'Weiyuan', time: '03:54', wpm: 83 },
  { rank: 7, name: 'a', time: '03:40', wpm: 77 },
  { rank: 8, name: 'b', time: '04:00', wpm: 72 },
  { rank: 9, name: 'c', time: '04:13', wpm: 68 },
  { rank: 10, name: 'd', time: '04:30', wpm: 60 },
  { rank: 11, name: 'e', time: '04:48', wpm: 58 },
  { rank: 12, name: 'f', time: '05:00', wpm: 50 },
];

const PAGE_SIZE = 10;

export default function Leaderboard() {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('allTime');
  const [currentPage, setCurrentPage] = useState(1);

  const handleTimePeriodClick = (timePeriod: string) => {
    setSelectedTimePeriod(timePeriod);
    setCurrentPage(1);
  };

  const handlePrevPageClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  };



  const sortedUsers = users.sort((a, b) => b.wpm - a.wpm);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <Page colour="#FFECE4">
      <Heading>Result</Heading>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>RANK</th>
              <th className={styles.th}>NAME</th>
              <th className={styles.th}>TIME ELAPSED</th>
              <th className={styles.th}>WPM</th>
            </tr>
          </thead>
          <tbody className={styles.text}>
            {displayedUsers.map((user, index) => (
              <tr key={user.rank}>
                <td className={styles.extratd}>{startIndex + index + 1}</td>
                <td className={styles.td}>{user.name}</td>
                <td className={styles.td}>{user.time}</td>
                <td className={styles.td}>{user.wpm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

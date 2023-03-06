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

  const filteredUsers = users.filter((user) => {
    if (selectedTimePeriod === 'allTime') {
      return true;
    } 
    else {
      const currentDate = new Date();
      const userDate = new Date(user.time);
      const timeDiff = currentDate.getTime() - userDate.getTime();

      switch (selectedTimePeriod) {
        case 'year':
          const yearDiff = currentDate.getFullYear() - userDate.getFullYear();
          return yearDiff <= 1 && timeDiff >= 0;
        case 'month':
          const monthDiff = (currentDate.getFullYear() - userDate.getFullYear()) * 12 + (currentDate.getMonth() - userDate.getMonth());
          return monthDiff <= 1 && timeDiff >= 0;
        case 'week':
          const weekDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
          return weekDiff <= 1;
        case 'day':
          const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          return dayDiff <= 1;
        default:
          return true;
      }
    }
  });

  const sortedUsers = filteredUsers.sort((a, b) => b.wpm - a.wpm);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <Page colour="#FFECE4">
      <Heading>LEADERBOARD</Heading>
      <div>
        <button className={styles.button} onClick={() => handleTimePeriodClick('allTime')}>
          <span>all time</span>
        </button>
        <button className={styles.button} onClick={() => handleTimePeriodClick('year')}>
          <span>year</span>
        </button>
        <button className={styles.button} onClick={() => handleTimePeriodClick('month')}>
          <span>month</span>
        </button>
        <button className={styles.button} onClick={() => handleTimePeriodClick('week')}>
          <span>week</span>
        </button>
        <button className={styles.button} onClick={() => handleTimePeriodClick('day')}>
          <span>day</span>
        </button>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>rank</th>
              <th className={styles.th}>name</th>
              <th className={styles.th}>time elapsed</th>
              <th className={styles.th}>wpm</th>
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
      <div className={styles.pagebuttoncontainer}>
        <button className={styles.pagebutton} onClick={handlePrevPageClick} disabled={currentPage === 1}>
          <span>perv</span>
        </button>
        <span className={styles.pagetext}>{currentPage}</span>
        <button className={styles.pagebutton} onClick={handleNextPageClick} disabled={endIndex >= sortedUsers.length}>
          <span>next</span>
        </button>
      </div>
    </Page>
  );
}

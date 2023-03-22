import Link from "next/link";
import React from "react";
import { createClient } from "../../../database/server";
import { Database } from "../../../database/types";
import styles from "./styles.module.css";

const PAGE_SIZE = 10;

type LeaderboardResultData =
  Database["public"]["Functions"]["leaderboard"]["Returns"][0];

const millisecondsToString = (ms: number): string => {
  const s = ms / 1000;
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const LeaderboardResult: React.FC<LeaderboardResultData> = ({
  rank,
  username,
  time_ms,
  wpm,
}) => {
  const time = millisecondsToString(time_ms);

  return (
    <tr>
      <td className={styles.extratd}>{rank}</td>
      <td className={styles.td}>{username}</td>
      <td className={styles.td}>{time}</td>
      <td className={styles.td}>{wpm}</td>
    </tr>
  );
};

export type Time = "alltime" | "month" | "week" | "day";

const TIMES = new Set(["alltime", "month", "week", "day"]);

const isValidTime = (string: string | undefined): string is Time => {
  return string ? TIMES.has(string) : false;
};

const getPage = (slug: string | undefined): number => {
  const number = slug ? parseInt(slug, 10) : NaN;

  return isNaN(number) ? 0 : number;
};

export const getTimeAndPage = (
  slug: string[] | undefined
): { time: Time; page: number } => {
  if (slug && isValidTime(slug[0])) {
    return { time: slug[0], page: getPage(slug[1]) };
  } else {
    return { time: "alltime", page: getPage(slug?.[1]) };
  }
};

const LeaderboardTimePicker = () => {
  return (
    <div>
      <Link href="/leaderboard/alltime/0" className={styles.button}>
        alltime
      </Link>
      <Link href="/leaderboard/year/0" className={styles.button}>
        year
      </Link>
      <Link href="/leaderboard/month/0" className={styles.button}>
        month
      </Link>
      <Link href="/leaderboard/week/0" className={styles.button}>
        week
      </Link>
      <Link href="/leaderboard/day/0" className={styles.button}>
        day
      </Link>
    </div>
  );
};

const LeaderboardPagePicker: React.FC<{ time: Time; page: number }> = ({
  time,
  page,
}) => {
  return (
    <div className={styles.pagebuttoncontainer}>
      {page > 0 ? (
        <Link
          className={styles.pageButton}
          href={`/leaderboard/${time}/${page - 1}`}
        >
          {page - 1}
        </Link>
      ) : null}
      <span className={styles.pagetext}>{page}</span>
      <Link
        className={styles.pageButton}
        href={`/leaderboard/${time}/${page + 1}`}
      >
        {page + 1}
      </Link>
    </div>
  );
};

export default async function Leaderboard({
  params,
}: {
  params: { slug: string[] };
}) {
  const supabase = createClient();

  const { time, page } = getTimeAndPage(params.slug);

  const { data } = await supabase.rpc("leaderboard", {
    start: page * PAGE_SIZE,
    number: PAGE_SIZE,
  });

  console.log(data);

  return (
    <div>
      <LeaderboardTimePicker />
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
          {data?.map((result) => (
            <LeaderboardResult {...result} key={result.rank} />
          ))}
        </tbody>
      </table>
      <LeaderboardPagePicker time={time} page={page} />
    </div>
  );
}

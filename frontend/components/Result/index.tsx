import styles from "./styles.module.css";

export interface Result { rank: number, username: string, time_ms: number, wpm: number }

const millisecondsToString = (ms: number): string => {
    const s = ms / 1000;
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const ResultTable: React.FC<{ results: Result[] }> = ({ results }) => {
    return (<table className={styles.table}>
    <thead>
      <tr>
        <th className={styles.th}>rank</th>
        <th className={styles.th}>name</th>
        <th className={styles.th}>time elapsed</th>
        <th className={styles.th}>wpm</th>
      </tr>
    </thead>
    <tbody className={styles.text}>
      {results.map((result) => (
        <Result {...result} key={result.rank} />
      ))}
    </tbody>
  </table>);
}

export const Result: React.FC<Result> = ({
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
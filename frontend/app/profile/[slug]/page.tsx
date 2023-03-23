import { Heading } from "../../../components/heading";
import { ModelPage, Page } from "../../../components/page";
import { Subheading } from "../../../components/subheading";
import styles from "./styles.module.css";
import { Canvas } from "@react-three/fiber";
import { ProfileIcon } from "../../../components/profileIcon";
import { RaceCar } from "../../../components/models/racecar";

interface User {
  rank: number;
  time: string;
  wpm: number;
  averwpm: number;
  races: number;
}

const user: User[] = [];

export default function Profile({ params }: { params: { slug: string } }) {
  // get the username from the URL
  const username = params.slug;

  return (
    <ModelPage
      colour="#FFFFFF"
      content={
        <>
          <Heading>{username.toUpperCase()}'S PROFILE</Heading>
          <table className={styles.table}>
            <tr>
              <th className={styles.th}>average wpm</th>
              <td className={styles.td}></td>
            </tr>
            <tr>
              <th className={styles.th}>races</th>
              <td className={styles.td}></td>
            </tr>
          </table>
          <Subheading>high scores</Subheading>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>rank</th>
                <th className={styles.th}>time elapsed</th>
                <th className={styles.th}>wpm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.extratd}></td>
                <td className={styles.td}></td>
                <td className={styles.td}></td>
              </tr>
            </tbody>
          </table>
        </>
      }
      model={<RaceCar rotation={[0.05, 1 * Math.PI, 0]} />}
    />
  );
}

{
  /* <div className={styles.profileicon}>
          <ProfileIcon />
        </div>
      </div> */
}

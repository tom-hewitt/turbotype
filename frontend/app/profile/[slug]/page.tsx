import { Heading } from "../../../components/heading";
import { ModelPage, Page } from "../../../components/page";
import { Subheading } from "../../../components/subheading";
import styles from "./styles.module.css";
import { Canvas } from "@react-three/fiber";
import { ProfileIcon } from "../../../components/profileIcon";
import { RaceCar } from "../../../components/models/racecar";
import { Html } from "@react-three/drei";
import { Model } from "./model";
import { createClient } from "../../../database/server";

interface User {
  rank: number;
  time: string;
  wpm: number;
  averwpm: number;
  races: number;
}

const user: User[] = [];

export default async function Profile({
  params,
}: {
  params: { slug: string };
}) {
  const id = params.slug;

  const supabase = createClient();

  const result = await supabase.from("users").select("*").eq("id", id).single();

  console.log(result);

  if (!result.data) {
    return <h1>User not found.</h1>;
  }

  return (
    <ModelPage
      colour="#FFFFFF"
      content={
        <>
          <Heading>{result.data.username.toUpperCase()}'S PROFILE</Heading>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th className={styles.th}>average wpm</th>
                <td className={styles.td}></td>
              </tr>
              <tr>
                <th className={styles.th}>races</th>
                <td className={styles.td}></td>
              </tr>
            </tbody>
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
      model={<Model />}
    />
  );
}

{
  /* <div className={styles.profileicon}>
          <ProfileIcon />
        </div>
      </div> */
}

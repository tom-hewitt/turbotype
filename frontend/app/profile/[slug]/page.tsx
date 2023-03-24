import { Heading } from "../../../components/heading";
import { ModelPage } from "../../../components/page";
import { Subheading } from "../../../components/subheading";
import styles from "./styles.module.css";
import { Model } from "./model";
import { createClient } from "../../../database/server";

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
          <Heading>{result.data.username.toUpperCase()}</Heading>
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

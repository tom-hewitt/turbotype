import { ReactNode } from "react";
import { NavBar } from "../navbar";
import styles from "./styles.module.css";

export const Page = ({
  colour,
  children,
}: {
  colour: string;
  children: ReactNode;
}) => {
  return (
    <div className={styles.page} style={{ backgroundColor: colour }}>
      <NavBar colour={colour} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

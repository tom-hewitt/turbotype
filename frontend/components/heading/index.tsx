import { ReactNode } from "react";
import { anton } from "../../app/layout";
import styles from "./styles.module.css";

export const Heading = ({ children }: { children: ReactNode }) => {
  return <h1 className={`${anton.className} ${styles.heading}`}>{children}</h1>;
};

import { ReactNode } from "react";
import { anton } from "../../app/fonts";
import styles from "./styles.module.css";

export const Subheading = ({ children }: { children: ReactNode }) => {
  return <h1 className={`${anton.className} ${styles.subheading}`}>{children}</h1>;
};
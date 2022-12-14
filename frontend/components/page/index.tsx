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
      <Gradient />
      <NavBar colour={colour} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const Gradient = () => {
  return (
    <div className={styles.gradient}>
      <svg
        className={styles.gradientShape}
        xmlns="http://www.w3.org/2000/svg"
        width="898"
        height="68"
        viewBox="0 0 898 68"
        fill="none"
      >
        <path
          d="M586.755 -257.941C822.321 -201.178 951.436 -89.5316 875.142 -8.57108C798.849 72.3894 546.037 92.0055 310.471 35.2426C74.9058 -21.5202 -54.2097 -133.167 22.0839 -214.128C98.3775 -295.088 351.189 -314.704 586.755 -257.941Z"
          fill="url(#paint0_linear_20_411)"
          fillOpacity="0.5"
        />
        <defs>
          <linearGradient
            id="paint0_linear_20_411"
            x1="849.691"
            y1="-18.9064"
            x2="33.2435"
            y2="47.4464"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF0000" />
            <stop offset="1" stopColor="#E5C46E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

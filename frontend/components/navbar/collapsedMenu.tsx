"use client";

import { useState } from "react";
import { NavLink, NavLinks } from ".";
import styles from "./styles.module.css";

export const CollapsedMenu = ({ colour }: { colour: string }) => {
  const [showCollapsedMenu, setShowCollapsedMenu] = useState(false);

  const toggleShowCollapsedMenu = () =>
    setShowCollapsedMenu(!showCollapsedMenu);

  return (
    <>
      <div
        className={styles.collapsedMenuButton}
        onClick={toggleShowCollapsedMenu}
      >
        <MenuIcon />
      </div>
      {showCollapsedMenu ? (
        <div
          className={styles.collapsedMenu}
          style={{ backgroundColor: colour }}
        >
          <NavLinks />
        </div>
      ) : null}
    </>
  );
};

const MenuIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
    >
      <path
        d="M0 1.5H23.5M0 10H23.5M0 18.5H23.5"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
};

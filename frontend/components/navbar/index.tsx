import Link from "next/link";
import React from "react";
import { anton } from "../../app/fonts";
import { Logo } from "../logo";
import { Spacer } from "../spacer";
import { UserOrLogin } from "../UserOrLogin";
import { CollapsedMenu } from "./collapsedMenu";
import styles from "./styles.module.css";

export const NavBar = ({ colour }: { colour: string }) => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Logo />
      </Link>
      <div className={styles.links}>
        <NavLinks />
      </div>
      <Spacer />
      <UserOrLogin />
      <CollapsedMenu colour={colour} />
    </nav>
  );
};

export const NavLinks = () => {
  return (
    <>
      <NavLink href="/play">PLAY</NavLink>
      <NavLink href="/tournaments">TOURNAMENTS</NavLink>
      <NavLink href="/leaderboard">LEADERBOARD</NavLink>
      <NavLink href="/customise">CUSTOMISE</NavLink>
    </>
  );
};

export const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link className={`${anton.className} ${styles.navlink}`} href={href}>
      {children}
    </Link>
  );
};

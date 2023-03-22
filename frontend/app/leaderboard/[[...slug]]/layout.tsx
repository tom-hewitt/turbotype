import Link from "next/link";
import { Heading } from "../../../components/heading";
import { Page } from "../../../components/page";
import styles from "./styles.module.css";

export default function LeaderboardLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  return (
    <Page colour="#FFECE4">
      <Heading>LEADERBOARD</Heading>
      {children}
    </Page>
  );
}

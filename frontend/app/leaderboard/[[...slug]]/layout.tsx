import Link from "next/link";
import { Heading } from "../../../components/heading";
import { ModelPage, Page } from "../../../components/page";
import styles from "./styles.module.css";
import {Crown,} from "../../../components/models/crown";

export default function LeaderboardLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  return (
    <ModelPage colour="#FFECE4" content={<><Heading>LEADERBOARD</Heading>{children}</>}model={<Crown rotation={[3.1,3.1,3.15]} scale={2.3} />}/>
  );
}
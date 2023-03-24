import { Heading } from "../../../components/heading";
import { ModelPage } from "../../../components/page";
import { Crown } from "../../../components/models/crown";

export default function LeaderboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  return (
    <ModelPage
      colour="#FFECE4"
      content={
        <>
          <Heading>LEADERBOARD</Heading>
          {children}
        </>
      }
      model={<Crown rotation={[3.1, 3.1, 3.15]} scale={2.3} />}
    />
  );
}

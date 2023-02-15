import { Heading } from "../../components/heading";
import { Page } from "../../components/page";
import { Subheading } from "../../components/subheading";


export default function Leaderboard() {
  return (
    <Page colour="#FFECE4">
      <Heading>LEADERBOARD</Heading>
      <nav>
        <ul style={{ display: 'flex', listStyleType: 'none', padding: '0.5rem', fontSize: '1.0rem' }}>
          <li style={{ marginRight: '1rem' }}><a href="#"><Subheading>ALL TIME</Subheading></a></li>
          <li style={{ marginRight: '1rem' }}><a href="#"><Subheading>YEAR</Subheading></a></li>
          <li style={{ marginRight: '1rem' }}><a href="#"><Subheading>MONTH</Subheading></a></li>
          <li style={{ marginRight: '1rem' }}><a href="#"><Subheading>WEEK</Subheading></a></li>
          <li style={{ marginRight: '1rem' }}><a href="#"><Subheading>DAY</Subheading></a></li>
        </ul>
      </nav>
    </Page>
  );
}

import { Heading } from "../../components/heading";
import { Page } from "../../components/page";

export default function Leaderboard() {
  return (
    <Page colour="#FFECE4">
      <Heading>LEADERBOARD</Heading>
      <nav>
        <ul style={{ display: 'flex', listStyleType: 'none', padding: '0.5rem', fontSize: '1.0rem' }}>
          <li style={{ marginRight: '1rem' }}><a href="#">ALL TIME</a></li>
          <li style={{ marginRight: '1rem' }}><a href="#">YEAR</a></li>
          <li style={{ marginRight: '1rem' }}><a href="#">MONTH</a></li>
          <li style={{ marginRight: '1rem' }}><a href="#">WEEK</a></li>
          <li style={{ marginRight: '1rem' }}><a href="#">DAY</a></li>
        </ul>
      </nav>
    </Page>
  );
}

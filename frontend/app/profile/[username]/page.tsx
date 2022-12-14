import { Heading } from "../../../components/heading";
import { Page } from "../../../components/page";

export default function Profile({ params }: { params: { username: string } }) {
  // get the username from the URL
  const { username } = params;

  return (
    <Page colour="#FFFFFF">
      <Heading>{username.toUpperCase()}'S PROFILE</Heading>
    </Page>
  );
}

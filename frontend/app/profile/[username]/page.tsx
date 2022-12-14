export default function Profile({ params }: { params: { username: string } }) {
  // get the username from the URL
  const { username } = params;

  return <h1>{username}'s Profile</h1>;
}

import "server-only";
import SupabaseListener from "../database/listener";
import SupabaseProvider from "../database/provider";

import { createClient } from "../database/server";
import "../styles/globals.css";

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const username: string | null = session
    ? (
        await supabase
          .from("users")
          .select("username")
          .eq("id", session.user.id)
      ).data?.[0]?.username
    : null;

  return (
    <html lang="en">
      {/*
      <head /> will contain the components returned by the nearest parent
      head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
    */}
      <head />
      <body>
        <SupabaseProvider session={session} username={username}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}

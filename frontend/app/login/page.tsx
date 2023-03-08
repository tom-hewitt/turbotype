"use client";

import { useSupabase } from "../../database/provider";

// Supabase auth needs to be triggered client-side
export default function Login() {
  const { supabase, session } = useSupabase();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {session ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleGoogleLogin}>Google Login</button>
      )}
    </>
  );
}

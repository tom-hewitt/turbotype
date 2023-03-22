import { useSupabase } from "../../database/provider";

export const LoginButton = () => {
  const { supabase } = useSupabase();

  const login = async () => {
    supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return <button onClick={login}>Login With Google</button>;
};

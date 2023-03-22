"use client";

import { useSupabase } from "../../database/provider";
import { UserBadge } from "../UserBadge";

export const User: React.FC<{ username: string }> = ({ username }) => {
  const { supabase, session } = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <UserBadge username={username} />
      {session ? <button onClick={handleLogout}>Logout</button> : null}
    </div>
  );
};

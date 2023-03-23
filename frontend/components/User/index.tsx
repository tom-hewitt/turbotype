"use client";

import { useSupabase } from "../../database/provider";
import { UserBadge } from "../UserBadge";

export const User: React.FC<{ username: string; id: string }> = ({
  username,
  id,
}) => {
  const { supabase, session } = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <UserBadge username={username} id={id} />
      {session ? <button onClick={handleLogout}>Logout</button> : null}
    </div>
  );
};

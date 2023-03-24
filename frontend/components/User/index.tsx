"use client";

import { useSupabase } from "../../database/provider";
import { UserBadge } from "../UserBadge";

export const User: React.FC<{ username: string; id: string; color: string }> = ({
  username,
  id,
  color,
}) => {
  const { supabase, session } = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <UserBadge username={username} id={id} color={color} />
      {session ? <button onClick={handleLogout}>Logout</button> : null}
    </div>
  );
};

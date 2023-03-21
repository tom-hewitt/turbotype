"use client";

import { FormEvent, useState } from "react";
import { useSupabase } from "../../database/provider";

export const SignUpModal: React.FC = () => {
  const { supabase, session } = useSupabase();

  const [username, setUsername] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log({ id: session?.user.id, username });

    supabase
      .rpc("signup", { id: session?.user.id, username })
      .then((value) => console.log(value));
  };

  const handleBack = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Start Racing!</button>
      </form>
      <button onClick={handleBack}>back</button>
    </div>
  );
};

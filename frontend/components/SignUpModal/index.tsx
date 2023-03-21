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
      .from("users")
      .insert({ id: session?.user.id, username })
      .then((value) => console.log(value));
  };

  const handleBack = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      {session?.user.email ? (
        <span>authenticated as {session.user.email}</span>
      ) : null}
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

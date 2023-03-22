"use client";

import { FormEvent, useState } from "react";
import { useSupabase } from "../../database/provider";
import { Heading } from "../heading";
import { Spacer } from "../spacer";
import styles from "./styles.module.css";

export const SignUpModal: React.FC = () => {
  const { supabase, session } = useSupabase();

  const [username, setUsername] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log({ id: session?.user.id, username });

    if (!session) {
      throw new Error("session is null");
    }

    supabase
      .from("users")
      .insert({ id: session?.user.id, username })
      .then((value) => console.log(value));
  };

  const handleBack = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {session?.user.email ? (
            <span>authenticated as {session.user.email}</span>
          ) : null}
          <Spacer />
          <button onClick={handleBack}>✕</button>
        </div>
        <Heading>CHOOSE YOUR NAME</Heading>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">start racing!</button>
        </form>
      </div>
    </div>
  );
};

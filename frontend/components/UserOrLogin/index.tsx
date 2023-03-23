"use client";

import { useSupabase } from "../../database/provider";
import { LoginButton } from "../LoginButton";
import { User } from "../User";

export const UserOrLogin = () => {
  const { username, id } = useSupabase();

  return username && id ? (
    <User username={username} id={id} />
  ) : (
    <LoginButton />
  );
};

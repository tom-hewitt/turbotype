"use client";

import { useSupabase } from "../../database/provider";
import { LoginButton } from "../LoginButton";
import { User } from "../User";

export const UserOrLogin = () => {
  const { username, id, color } = useSupabase();

  return username && id && color ? (
    <User username={username} id={id} color={color} />
  ) : (
    <LoginButton />
  );
};

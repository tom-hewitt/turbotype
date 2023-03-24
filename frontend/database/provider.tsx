"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "./browser";

import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@turbotype/database";

type SupabaseContext = {
  username: string | undefined | null;
  id: string | undefined;
  color: string | undefined;
  supabase: SupabaseClient<Database>;
  session: Session | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
  session,
  username,
  id,
  color,
}: {
  children: React.ReactNode;
  session: Session | null;
  username: string | undefined | null;
  id: string | undefined;
  color: string | undefined;
}) {
  const [supabase] = useState(() => createClient());

  return (
    <Context.Provider value={{ username, id, supabase, session, color }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  } else {
    return context;
  }
};

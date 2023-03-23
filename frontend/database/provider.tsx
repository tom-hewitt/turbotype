"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "./browser";

import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./types";

type SupabaseContext = {
  username: string | undefined | null;
  id: string | undefined;
  supabase: SupabaseClient<Database>;
  session: Session | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
  session,
  username,
  id,
}: {
  children: React.ReactNode;
  session: Session | null;
  username: string | undefined | null;
  id: string | undefined;
}) {
  const [supabase] = useState(() => createClient());

  return (
    <Context.Provider value={{ username, id, supabase, session }}>
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

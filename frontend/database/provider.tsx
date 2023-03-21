"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "./browser";

import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";

type SupabaseContext = {
  username: string | null;
  supabase: SupabaseClient;
  session: Session | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
  session,
  username,
}: {
  children: React.ReactNode;
  session: Session | null;
  username: string | null;
}) {
  const [supabase] = useState(() => createClient());

  return (
    <Context.Provider value={{ username, supabase, session }}>
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

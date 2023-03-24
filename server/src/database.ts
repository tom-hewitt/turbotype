import { createClient } from "@supabase/supabase-js";
import type { Database } from "@turbotype/database";

export const getColorFromDatabase = async (id: string): Promise<string> => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const res = await supabase
    .from("users")
    .select("color")
    .eq("id", id)
    .single();

  if (res.data === null) {
    throw new Error(JSON.stringify(res));
  }

  return res.data.color;
};

export const addSummaryToDatabase = async (
  race_chars: number,
  race_user_ids: any,
  race_times: any
): Promise<string> => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log(
    "adding summary to database:\n\tchars:",
    race_chars,
    "\n\tids",
    race_user_ids,
    "\n\ttimes",
    race_times
  );

  const result = await supabase.rpc("race_results", {
    race_chars,
    race_user_ids,
    race_times,
  });

  console.log("database result:", result);

  if (result.data === null) {
    throw new Error(JSON.stringify(result));
  }

  return result.data;
};

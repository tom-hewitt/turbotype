import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import type { Database } from "@turbotype/database";

config();

export const addSummaryToDatabase = async (
  race_chars: number,
  race_user_ids: any,
  race_times: any
): Promise<string> => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log(race_chars, race_user_ids, race_times);

  const result = await supabase.rpc("race_results", {
    race_chars,
    race_user_ids,
    race_times,
  });

  console.log("RESULT:", result);

  if (result.data === null) {
    throw new Error(JSON.stringify(result));
  }

  return result.data;
};

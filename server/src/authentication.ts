import { createClient } from "@supabase/supabase-js";
import { Database } from "@turbotype/database";
import { WebSocket, MessageEvent } from "ws";

export const authenticateWebsocket = async (
  socket: WebSocket
): Promise<string | null> => {
  const access_token = await waitForMessage(socket);
  console.log("received access token:", access_token);

  const refresh_token = await waitForMessage(socket);
  console.log("received refresh token:", refresh_token);

  return await authenticateTokens(access_token, refresh_token);
};

/**
 * asynchronously returns the next message sent by a socket
 * @param socket the socket we are waiting for to send the message
 * @returns a promise resolving to the next message
 */
const waitForMessage = (socket: WebSocket): Promise<string> => {
  return new Promise((resolve) => {
    const onMessage = (event: MessageEvent) => {
      const message = event.data;
      socket.removeEventListener("message", onMessage);
      resolve(message.toString());
    };

    socket.addEventListener("message", onMessage);
  });
};

export const authenticateTokens = async (
  access_token: string,
  refresh_token: string
): Promise<string | null> => {
  const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLIC_KEY!
  );

  console.log("authenticating session");

  const res = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  return res.data.user ? res.data.user.id : null;
};

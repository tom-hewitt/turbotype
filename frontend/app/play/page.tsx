import { MultiplayerGame } from "./game";

export default function Play() {
  if (!process.env.WEBSOCKET_URL) {
    return <h1>no websocket server available</h1>;
  }

  return <MultiplayerGame url={process.env.WEBSOCKET_URL} />;
}

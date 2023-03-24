import { WebSocket } from "ws";
import { MultiplayerRace } from "./race";

const PLAYERS_PER_RACE = 1;

export interface User {
  id: string | null;
  color: string;
  socket: WebSocket;
}

let matchmakingPlayers: User[] = [];

export const findMatch = (player: User) => {
  console.log("finding a match");

  matchmakingPlayers.push(player);

  if (matchmakingPlayers.length === PLAYERS_PER_RACE) {
    // create a new race for the matchmaking players
    new MultiplayerRace([...matchmakingPlayers]);

    // now all the players have found a match, empty the matchmaking players array
    matchmakingPlayers = [];
  }
};

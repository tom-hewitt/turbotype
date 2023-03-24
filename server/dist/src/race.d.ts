import { User } from "./matchmaker";
import { TypingState } from "@turbotype/game";
export interface Player extends User {
    state: TypingState;
}
export declare class MultiplayerRace {
    players: Player[];
    finishedPlayers: Map<number, number>;
    startTime: number;
    wordList: string[];
    constructor(users: User[]);
    handleKeyInput: (key: string, index: number) => void;
    hasStarted: () => boolean;
    endRace: () => Promise<void>;
}

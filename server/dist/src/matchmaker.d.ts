import { WebSocket } from "ws";
export interface User {
    id: string | null;
    color: string;
    socket: WebSocket;
}
export declare const findMatch: (player: User) => void;

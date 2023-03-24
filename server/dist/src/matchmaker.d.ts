import { WebSocket } from "ws";
export interface User {
    id: string | null;
    socket: WebSocket;
}
export declare const findMatch: (player: User) => void;

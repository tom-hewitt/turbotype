import { WebSocket } from "ws";
export declare const authenticateWebsocket: (socket: WebSocket) => Promise<string | null>;
export declare const authenticateTokens: (access_token: string, refresh_token: string) => Promise<string | null>;

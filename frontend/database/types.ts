export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      races: {
        Row: {
          chars: number;
          created_at: string | null;
          id: string;
        };
        Insert: {
          chars: number;
          created_at?: string | null;
          id?: string;
        };
        Update: {
          chars?: number;
          created_at?: string | null;
          id?: string;
        };
      };
      results: {
        Row: {
          race_id: string;
          time: number | null;
          user_id: string;
        };
        Insert: {
          race_id: string;
          time?: number | null;
          user_id: string;
        };
        Update: {
          race_id?: string;
          time?: number | null;
          user_id?: string;
        };
      };
      users: {
        Row: {
          id: string;
          username: string;
        };
        Insert: {
          id: string;
          username: string;
        };
        Update: {
          id?: string;
          username?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      leaderboard: {
        Args: {
          start?: number;
          number?: number;
        };
        Returns: {
          rank: number;
          user_id: string;
          username: string;
          race_id: string;
          chars: number;
          time_ms: number;
          wpm: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

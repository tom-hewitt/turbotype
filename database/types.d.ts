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
          player: number;
          race_id: string;
          time: number | null;
          user_id: string | null;
        };
        Insert: {
          player: number;
          race_id: string;
          time?: number | null;
          user_id?: string | null;
        };
        Update: {
          player?: number;
          race_id?: string;
          time?: number | null;
          user_id?: string | null;
        };
      };
      users: {
        Row: {
          color: string;
          id: string;
          username: string;
        };
        Insert: {
          color?: string;
          id: string;
          username: string;
        };
        Update: {
          color?: string;
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
      race_results: {
        Args: {
          race_chars: number;
          race_user_ids: string[];
          race_times: number[];
        };
        Returns: string;
      };
      summary: {
        Args: {
          summary_id: string;
        };
        Returns: {
          rank: number;
          user_id: string;
          username: string;
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

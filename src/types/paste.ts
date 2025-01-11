export interface Paste {
  id: string;
  content: string;
  created_at: number;
  expires_at: string | null;
  user_id: string | null;
  is_private: boolean;
}
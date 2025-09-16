export interface Podcast {
  id: number;
  title: string;
  description?: string;
  author: string;
  created_at?: string; // opcionalno da ne puca TS
  updated_at?: string;
}

import { useEffect, useState } from "react";
import api from "../api";

export interface Episode {
  id: number;
  title: string;
  description?: string;
  audio_url: string;
  duration?: string | number; // trajanje u sekundama ili minutima
  release_date?: string; // ISO datum
}

export const useEpisodes = (podcastId: number) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await api.get(`/podcasts/${podcastId}/episodes`);
        setEpisodes(res.data.data || res.data);
      } catch (err) {
        setError("Neuspešno učitavanje epizoda");
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [podcastId]);

  return { episodes, loading, error };
};

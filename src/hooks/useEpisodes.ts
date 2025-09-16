import { useEffect, useState } from "react";
import api from "../api";

export interface Episode {
  id: number;
  title: string;
  description?: string;
  audio_url: string;
  duration?: string | number;
  release_date?: string;
}

export const useEpisodes = (podcastId?: number) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!podcastId) return; // <--- ne šalji zahtev ako nema ID-ja

    const fetchEpisodes = async () => {
      setLoading(true);
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

import { useEffect, useState } from "react";
import api from "../api";

export interface Podcast {
  id: number;
  title: string;
  description?: string;
  author: string; // obavezno za PodcastCard
}

export const useMyPodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyPodcasts = async () => {
      try {
        const res = await api.get("/my-podcasts"); // backend endpoint za korisnikove podkaste
        const data = res.data.data || res.data;

        setPodcasts(
          data.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            author: p.user?.name || "Nepoznat", // mapiramo autora
          }))
        );
      } catch (err) {
        setError("Neuspešno učitavanje podkasta");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPodcasts();
  }, []);

  return { podcasts, loading, error };
};

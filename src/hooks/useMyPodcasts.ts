import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { Podcast } from "../components/PodcastCard";

export const useMyPodcasts = () => {
  const { user } = useContext(AuthContext);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchMyPodcasts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get(`/podcasts`, {
          params: { user_name: user.name }, // filtriranje po korisniku
        });

        const data = res.data.data || res.data;

        setPodcasts(
          data.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description || "Bez opisa",
            author: p.author?.name || "Nepoznat", // autor je string
            user_id: p.user_id || 0,
            cover_image_url: p.cover_image_url,
          }))
        );
      } catch (err: any) {
        console.error("Greška pri učitavanju podkasta:", err);
        setError(
          err.response?.data?.message || "Neuspešno učitavanje podkasta"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyPodcasts();
  }, [user]);

  return { podcasts, loading, error };
};

import { useEffect, useState } from "react";
import axios from "axios";

export interface Podcast {
  id: number;
  title: string;
  description: string;
  author: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export const usePodcasts = (
  query: string = "",
  filterBy: "title" | "author" = "title"
) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPodcasts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (query) {
        if (filterBy === "title") params.title = query;
        if (filterBy === "author") params.user_name = query;
      }

      const res = await axios.get("http://127.0.0.1:8000/api/podcasts", {
        params,
      });
      setPodcasts(res.data.data); // Assuming backend vraća paginaciju
      setError(null);
    } catch (err: any) {
      setError(err.message || "Greška pri učitavanju podcasta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, [query, filterBy]);

  return { podcasts, loading, error, refetch: fetchPodcasts };
};

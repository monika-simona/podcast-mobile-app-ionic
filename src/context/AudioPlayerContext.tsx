import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import api from "../api";
import { AuthContext } from "./AuthContext";

// Tip epizode
export interface Episode {
  id: number;
  title: string;
  description?: string;
  audio_url: string;
  duration?: string | number; // trajanje u sekundama ili minutima
  release_date?: string; // ISO datum
}

// Tip konteksta
interface AudioPlayerContextType {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  loadingAudio: boolean;
  playEpisode: (episode: Episode) => Promise<void>;
  togglePlay: () => void;
  stopEpisode: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

// Provider
export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext); // Dohvat prijavljenog korisnika
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadingAudio, setLoadingAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Update progress i duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentEpisode(null);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Reprodukcija epizode
  const playEpisode = async (episode: Episode) => {
    if (!user) {
      alert("Morate biti ulogovani da biste slušali epizodu.");
      return;
    }

    // Ako je ista epizoda već u toku
    if (currentEpisode?.id === episode.id && isPlaying) return;

    setLoadingAudio(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/episodes/${episode.id}/play`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const audioUrl = URL.createObjectURL(res.data);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = audioUrl;
      }

      setCurrentEpisode({ ...episode, audio_url: audioUrl });

      setTimeout(() => {
        audioRef.current?.play();
        setIsPlaying(true);
      }, 50);
    } catch (err) {
      console.error("Neuspešno učitavanje audio fajla", err);
      alert("Neuspešno učitavanje audio fajla.");
    } finally {
      setLoadingAudio(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopEpisode = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentEpisode(null);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        progress,
        duration,
        loadingAudio,
        playEpisode,
        togglePlay,
        stopEpisode,
      }}
    >
      {children}
      <audio ref={audioRef} hidden />
    </AudioPlayerContext.Provider>
  );
};

// Custom hook
export const useAudioPlayer = () => {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx)
    throw new Error("useAudioPlayer must be used unutar AudioPlayerProvider");
  return ctx;
};

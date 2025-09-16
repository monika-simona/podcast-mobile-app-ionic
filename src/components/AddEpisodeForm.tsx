import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonButton,
  IonItem,
  IonLabel,
  IonDatetime,
} from "@ionic/react";
import api from "../api";
import { Podcast } from "../components/PodcastCard";

interface AddEpisodeFormProps {
  podcast: Podcast;
  onClose: () => void;
  onCreated: (newEpisode: any) => void;
}

const AddEpisodeForm: React.FC<AddEpisodeFormProps> = ({
  podcast,
  onClose,
  onCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Naziv epizode je obavezan.");
      return;
    }

    if (!audio) {
      setError("Audio fajl je obavezan.");
      return;
    }

    const allowedTypes = ["audio/mpeg", "audio/wav"];
    if (!allowedTypes.includes(audio.type)) {
      setError("Dozvoljeni formati su mp3 i wav.");
      return;
    }

    const maxSize = 40 * 1024 * 1024; // 40MB
    if (audio.size > maxSize) {
      setError("Audio fajl ne može biti veći od 40MB.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("podcast_id", podcast.id.toString());
    if (releaseDate) formData.append("release_date", releaseDate);
    formData.append("audio", audio);

    try {
      const res = await api.post("/episodes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCreated(res.data); // odmah dodaje epizodu u listu
      setTitle("");
      setDescription("");
      setReleaseDate("");
      setAudio(null);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Došlo je do greške pri dodavanju epizode."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonCard style={{ marginBottom: "15px" }}>
      <IonCardHeader>
        <IonCardTitle>Dodaj epizodu za: {podcast.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <IonItem>
          <IonLabel position="stacked">Naziv epizode</IonLabel>
          <IonInput
            value={title}
            placeholder="Unesite naziv epizode"
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Opis epizode (opciono)</IonLabel>
          <IonTextarea
            value={description}
            placeholder="Unesite opis epizode"
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Datum izlaska (opciono)</IonLabel>
          <IonDatetime
            presentation="date"
            value={releaseDate}
            onIonChange={(e) => setReleaseDate(e.detail.value as string)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Audio fajl</IonLabel>
          <input
            type="file"
            accept=".mp3,.wav,audio/*"
            onChange={(e) =>
              setAudio(e.target.files ? e.target.files[0] : null)
            }
          />
        </IonItem>

        <IonButton
          expand="block"
          color="primary"
          style={{ marginTop: "15px" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Dodavanje..." : "Dodaj epizodu"}
        </IonButton>

        <IonButton
          expand="block"
          color="medium"
          style={{ marginTop: "10px" }}
          onClick={onClose}
        >
          Otkaži
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default AddEpisodeForm;

import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel,
  IonDatetime,
} from "@ionic/react";
import api from "../api";
import { Episode } from "../context/AudioPlayerContext";

interface EditEpisodeFormProps {
  episode: Episode;
  onClose: () => void;
  onUpdated: (updated: Episode) => void; // OVO je novo
}

const EditEpisodeForm: React.FC<EditEpisodeFormProps> = ({
  episode,
  onClose,
  onUpdated,
}) => {
  const [title, setTitle] = useState(episode.title);
  const [description, setDescription] = useState(episode.description || "");
  const [releaseDate, setReleaseDate] = useState(episode.release_date || "");
  const [audio, setAudio] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("title", title);
      formData.append("description", description);
      formData.append("release_date", releaseDate);
      if (audio) formData.append("audio", audio);

      const res = await api.post(`/episodes/${episode.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedEpisode = res.data; // prilagodi ako je res.data.data
      onUpdated(updatedEpisode); // POZOVI onUpdated
      onClose();
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      setError("Došlo je do greške prilikom izmene epizode.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonCard style={{ marginTop: "10px" }}>
      <IonCardHeader>
        <IonCardTitle>Izmeni epizodu</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <IonItem>
          <IonLabel position="stacked">Naziv epizode</IonLabel>
          <IonInput
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Opis epizode</IonLabel>
          <IonTextarea
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Datum izlaska</IonLabel>
          <IonDatetime
            presentation="date"
            value={releaseDate}
            onIonChange={(e) =>
              setReleaseDate((e.detail.value as string) || "")
            }
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
          {loading ? "Sačuvaj..." : "Sačuvaj izmene"}
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

export default EditEpisodeForm;

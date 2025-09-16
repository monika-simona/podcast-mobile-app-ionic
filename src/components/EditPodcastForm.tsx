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
} from "@ionic/react";
import api from "../api";
import { Podcast } from "../components/PodcastCard";

interface EditPodcastFormProps {
  podcast: Podcast;
  onClose: () => void;
  setPodcasts: React.Dispatch<React.SetStateAction<Podcast[]>>;
}

const EditPodcastForm: React.FC<EditPodcastFormProps> = ({
  podcast,
  onClose,
  setPodcasts,
}) => {
  const [title, setTitle] = useState(podcast.title);
  const [description, setDescription] = useState(podcast.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Naziv podkasta je obavezan.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.post(`/podcasts/${podcast.id}?_method=PUT`, {
        title,
        description,
      });

      const updated = res.data;

      setPodcasts((prev) =>
        prev.map((p) => (p.id === podcast.id ? updated : p))
      );

      onClose();
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Došlo je do greške pri ažuriranju podkasta."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Izmeni podkast</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <IonItem>
          <IonLabel position="stacked">Naziv podkasta</IonLabel>
          <IonInput
            value={title}
            placeholder="Unesite naziv"
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Opis podkasta</IonLabel>
          <IonTextarea
            value={description}
            placeholder="Unesite opis"
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Čuvanje..." : "Sačuvaj izmene"}
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

export default EditPodcastForm;

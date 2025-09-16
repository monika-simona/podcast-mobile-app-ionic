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

interface AddPodcastFormProps {
  onClose: () => void;
  onCreated: (newPodcast: Podcast) => void;
}

const AddPodcastForm: React.FC<AddPodcastFormProps> = ({
  onClose,
  onCreated,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      const res = await api.post("/podcasts", {
        title,
        description,
      });
      // Ako tvoj API vraća objekat u res.data.data, zameni sa res.data.data
      const created = res.data;
      onCreated(created); // prosledi parentu
      setTitle("");
      setDescription("");
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Došlo je do greške pri dodavanju podkasta."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Dodaj novi podkast</IonCardTitle>
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
          {loading ? "Dodavanje..." : "Dodaj podkast"}
        </IonButton>

        <IonButton
          expand="block"
          color="medium"
          style={{ marginTop: "10px" }}
          onClick={onClose}
        >
          Zatvori
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default AddPodcastForm;

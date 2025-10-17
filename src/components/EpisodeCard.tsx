import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { Episode, useAudioPlayer } from "../context/AudioPlayerContext";
import EditEpisodeForm from "./EditEpisodeForm";

interface EpisodeCardProps {
  episode: Episode;
  onUpdated?: (updated: Episode) => void; // sada opcionalno
  onDeleted?: (id: number) => void; // sada opcionalno
  isMyPodcastsPage?: boolean; // prikazuje ikonice samo tamo
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  onUpdated,
  onDeleted,
  isMyPodcastsPage = false,
}) => {
  const { currentEpisode, playEpisode, stopEpisode } = useAudioPlayer();
  const isCurrent = currentEpisode?.id === episode.id;

  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (
      window.confirm("Da li ste sigurni da želite da obrišete ovu epizodu?")
    ) {
      onDeleted?.(episode.id); // opcionalni poziv
    }
  };

  return (
    <IonCard style={{ position: "relative", marginBottom: "15px" }}>
      {isMyPodcastsPage && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            gap: "10px",
            zIndex: 10,
          }}
        >
          <CiEdit
            size={22}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
            }}
          />
          <MdOutlineDelete
            size={22}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          />
        </div>
      )}

      <IonCardHeader>
        <IonCardTitle>{episode.title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p>{episode.description}</p>

        {episode.release_date && (
          <p>
            <strong>Datum objave:</strong>{" "}
            {new Date(episode.release_date).toLocaleDateString()}
          </p>
        )}

        {episode.duration && (
          <p>
            <strong>Trajanje:</strong> {episode.duration} min
          </p>
        )}

        {!isCurrent ? (
          <IonButton onClick={() => playEpisode(episode)}> ▶ Play</IonButton>
        ) : (
          <IonButton onClick={stopEpisode}>Stop</IonButton>
        )}

        {isEditing && onUpdated && (
          <EditEpisodeForm
            episode={episode}
            onClose={() => setIsEditing(false)}
            onUpdated={onUpdated}
          />
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default EpisodeCard;

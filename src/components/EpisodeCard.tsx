import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { Episode, useAudioPlayer } from "../context/AudioPlayerContext";

interface Props {
  episode: Episode;
}

const EpisodeCard: React.FC<Props> = ({ episode }) => {
  const { currentEpisode, playEpisode, stopEpisode } = useAudioPlayer();
  const isCurrent = currentEpisode?.id === episode.id;

  return (
    <IonCard>
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
          <IonButton onClick={() => playEpisode(episode)}>▶️ Play</IonButton>
        ) : (
          <IonButton onClick={stopEpisode}>Stop</IonButton>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default EpisodeCard;

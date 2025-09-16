import React, { useContext } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { AuthContext } from "../context/AuthContext";

export interface Podcast {
  id: number;
  title: string;
  description?: string;
  author: string; // ostaje string
  user_id: number;
  cover_image_url?: string;
}

interface PodcastCardProps {
  podcast: Podcast;
  children?: React.ReactNode;
  onViewDetails?: (id: number) => void;
  showEpisodesButton?: boolean;
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  podcast,
  children,
  showEpisodesButton,
  onViewDetails,
}) => {
  const { user } = useContext(AuthContext);
  const isAuthor = user && user.id === podcast.user_id;

  return (
    <IonCard
      button={!showEpisodesButton} // klikabilna na Home
      onClick={
        !showEpisodesButton && onViewDetails
          ? () => onViewDetails(podcast.id)
          : undefined
      }
    >
      <IonCardHeader>
        <IonCardTitle>{podcast.title}</IonCardTitle>
        <p>Autor: {podcast.author}</p>
      </IonCardHeader>
      <IonCardContent>
        <p>{podcast.description}</p>
        {children}
        {showEpisodesButton && onViewDetails && (
          <IonButton
            fill="outline"
            onClick={(e) => {
              e.stopPropagation(); // spreči klik na celu karticu
              onViewDetails(podcast.id);
            }}
          >
            Prikaži epizode
          </IonButton>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default PodcastCard;

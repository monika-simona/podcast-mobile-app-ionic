import React, { useContext } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { AuthContext } from "../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

export interface Podcast {
  id: number;
  title: string;
  description?: string;
  author: string;
  user_id: number;
  cover_image_url?: string;
}

interface PodcastCardProps {
  podcast: Podcast;
  children?: React.ReactNode;
  onViewDetails?: (id: number) => void;
  showEpisodesButton?: boolean;
  selectedPodcastId?: number | null;
  onAddEpisode?: (podcastId: number) => void;
  onEditPodcast?: (podcast: Podcast) => void;
  onDeletePodcast?: (podcastId: number) => void;
  isEpisodeFormOpen?: boolean; // DODATO
  isMyPodcastsPage?: boolean; // DODATO – prikazuje ikone samo tamo
}

const PodcastCard: React.FC<PodcastCardProps> = ({
  podcast,
  children,
  showEpisodesButton,
  onViewDetails,
  selectedPodcastId,
  onAddEpisode,
  onEditPodcast,
  onDeletePodcast,
  isMyPodcastsPage = false,
}) => {
  const { user } = useContext(AuthContext);
  const isAuthor = user && user.id === podcast.user_id;

  return (
    <IonCard
      button={!showEpisodesButton}
      onClick={
        !showEpisodesButton && onViewDetails
          ? () => onViewDetails(podcast.id)
          : undefined
      }
      style={{ position: "relative" }}
    >
      {/* Ikonice u gornjem desnom uglu */}
      {isMyPodcastsPage && isAuthor && (
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
          {onEditPodcast && (
            <CiEdit
              size={22}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                onEditPodcast(podcast);
              }}
            />
          )}
          {onDeletePodcast && (
            <MdOutlineDelete
              size={22}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                onDeletePodcast(podcast.id);
              }}
            />
          )}
        </div>
      )}

      <IonCardHeader>
        <IonCardTitle>{podcast.title}</IonCardTitle>
        <p>Autor: {podcast.author}</p>
      </IonCardHeader>
      <IonCardContent>
        <p>{podcast.description}</p>
        {children}
        {showEpisodesButton && onViewDetails && (
          <>
            <IonButton
              fill="outline"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(podcast.id);
              }}
              style={{ marginRight: "10px" }}
            >
              {selectedPodcastId === podcast.id
                ? "Sakrij epizode"
                : "Prikaži epizode"}
            </IonButton>

            {onAddEpisode && (
              <IonButton
                fill="solid"
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddEpisode(podcast.id);
                }}
              >
                {selectedPodcastId === podcast.id
                  ? "Odustani"
                  : "Dodaj epizodu"}
              </IonButton>
            )}
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default PodcastCard;

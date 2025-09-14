import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { Episode } from "../data/dummyData";
import { useState } from "react";

interface Props {
  episode: Episode;
  onPlay: (episode: Episode) => void;
}

const EpisodeCard: React.FC<Props> = ({ episode, onPlay }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 100;
  const desc =
    !expanded && episode.description?.length > maxLength
      ? episode.description.slice(0, maxLength) + "..."
      : episode.description;

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{episode.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>
          {desc}{" "}
          {episode.description && episode.description.length > maxLength && (
            <span
              style={{ color: "#3880ff", cursor: "pointer" }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Collapse" : "Read more"}
            </span>
          )}
        </p>
        <IonButton onClick={() => onPlay(episode)}>Play</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default EpisodeCard;

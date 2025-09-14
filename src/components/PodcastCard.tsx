import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonCardContent,
} from "@ionic/react";
import { Podcast } from "../data/dummyData";

interface Props {
  podcast: Podcast;
  onViewDetails: (id: number) => void;
}

const PodcastCard: React.FC<Props> = ({ podcast, onViewDetails }) => {
  return (
    <IonCard button onClick={() => onViewDetails(podcast.id)}>
      <IonImg src={podcast.cover_image_url || "/default-cover.png"} />
      <IonCardHeader>
        <IonCardTitle>{podcast.title}</IonCardTitle>
        <IonCardSubtitle>{podcast.author}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{podcast.description?.slice(0, 60)}...</IonCardContent>
    </IonCard>
  );
};

export default PodcastCard;

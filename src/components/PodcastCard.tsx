import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonCardContent,
} from "@ionic/react";

export interface Podcast {
  id: number;
  title: string;
  author: string;
  description?: string;
  cover_image_url?: string; // koristi se URL iz backenda
}

interface Props {
  podcast: Podcast;
  onViewDetails: (id: number) => void;
}

const PodcastCard: React.FC<Props> = ({ podcast, onViewDetails }) => {
  return (
    <IonCard button onClick={() => onViewDetails(podcast.id)}>
      <IonCardHeader>
        <IonCardTitle>{podcast.title}</IonCardTitle>
        <IonCardSubtitle>{podcast.author}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        {podcast.description ? podcast.description.slice(0, 60) + "..." : ""}
      </IonCardContent>
    </IonCard>
  );
};

export default PodcastCard;

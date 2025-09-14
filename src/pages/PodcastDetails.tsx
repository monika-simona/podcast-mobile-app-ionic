import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { podcasts } from "../data/dummyData";
import EpisodeCard from "../components/EpisodeCard";
import { useState } from "react";

const PodcastDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const podcast = podcasts.find((p) => p.id === Number(id));
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );

  const handlePlay = (episode: any) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    const audio = new Audio(episode.audio_url);
    audio.play();
    setCurrentAudio(audio);
  };

  if (!podcast) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>Podcast nije pronađen</p>
          <button onClick={() => history.push("/home")}>Nazad</button>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{podcast.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>
          <strong>Autor:</strong> {podcast.author}
        </p>
        <p>{podcast.description}</p>

        <h2>Epizode:</h2>
        {podcast.episodes.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} onPlay={handlePlay} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default PodcastDetails;

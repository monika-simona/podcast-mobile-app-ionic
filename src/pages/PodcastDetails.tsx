import {
  IonPage,
  IonContent,
  IonInput,
  IonList,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EpisodeCard from "../components/EpisodeCard";
import PlayerShell from "../components/PlayerShell";
import { useEpisodes } from "../hooks/useEpisodes";
import { usePodcasts } from "../hooks/usePodcasts";
import { Episode } from "../context/AudioPlayerContext";

const PodcastDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [search, setSearch] = useState("");

  // Hook za podkast
  const { podcasts } = usePodcasts();
  const podcast = podcasts.find((p) => p.id === Number(id));

  // Hook za epizode
  const { episodes: fetchedEpisodes, loading, error } = useEpisodes(Number(id));

  // Filter po search-u
  const episodes: Episode[] = fetchedEpisodes
    .map((ep: any) => ({
      ...ep,
      audio_url: ep.audio_url || ep.audio_path,
    }))
    .filter((ep: Episode) =>
      ep.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <PlayerShell>
      <IonPage>
        {/* Header sa naslovom i translucent */}
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Podcast Details</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Fullscreen content */}
        <IonContent fullscreen className="ion-padding">
          {/* Podkast informacije */}
          {podcast && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{podcast.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  <strong>Autor:</strong> {podcast.author}
                </p>
                {podcast.description && <p>{podcast.description}</p>}
              </IonCardContent>
            </IonCard>
          )}

          {/* Input za pretragu epizoda */}
          <IonInput
            placeholder="Pretraži epizode"
            value={search}
            onIonChange={(e) => setSearch(e.detail.value!)}
            debounce={500}
            style={{ marginBottom: "15px" }}
          />

          {/* Loading / error */}
          {loading && <IonSpinner name="crescent" />}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Lista epizoda */}
          <IonList>
            {episodes.length > 0
              ? episodes.map((ep: Episode) => (
                  <EpisodeCard key={ep.id} episode={ep} />
                ))
              : !loading && <p>Nema epizoda za prikaz</p>}
          </IonList>
        </IonContent>
      </IonPage>
    </PlayerShell>
  );
};

export default PodcastDetails;

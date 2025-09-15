import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import { useMyPodcasts } from "../hooks/useMyPodcasts";
import PodcastCard from "../components/PodcastCard";
import EpisodeCard from "../components/EpisodeCard";
import { useEpisodes, Episode } from "../hooks/useEpisodes";

const MyPodcasts: React.FC = () => {
  const { podcasts, loading, error } = useMyPodcasts();
  const [selectedPodcastId, setSelectedPodcastId] = useState<number | null>(
    null
  );
  const { episodes } = useEpisodes(selectedPodcastId || 0);

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>{error}</p>;

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            {podcasts.map((podcast) => (
              <IonCol size="12" key={podcast.id}>
                <PodcastCard podcast={podcast}>
                  <IonButton onClick={() => setSelectedPodcastId(podcast.id)}>
                    Detalji
                  </IonButton>
                </PodcastCard>

                {selectedPodcastId === podcast.id &&
                  episodes.map((ep: Episode) => (
                    <EpisodeCard key={ep.id} episode={ep} />
                  ))}
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyPodcasts;

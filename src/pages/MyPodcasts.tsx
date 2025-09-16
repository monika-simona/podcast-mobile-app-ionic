import React, { useContext, useState } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { AuthContext } from "../context/AuthContext";
import PodcastCard, { Podcast } from "../components/PodcastCard";
import EpisodeCard from "../components/EpisodeCard";
import { useMyPodcasts } from "../hooks/useMyPodcasts";
import { useEpisodes } from "../hooks/useEpisodes";

const MyPodcastsPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { podcasts, loading, error } = useMyPodcasts();

  const [selectedPodcastId, setSelectedPodcastId] = useState<number | null>(
    null
  );

  const { episodes, loading: episodesLoading } = useEpisodes(
    selectedPodcastId || undefined
  );

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Moji podkasti</h2>

        {loading && <IonSpinner name="crescent" />}
        {error && <IonText color="danger">{error}</IonText>}

        <IonGrid>
          <IonRow>
            {!loading && podcasts.length === 0 && (
              <IonText>Nema podkasta za prikaz</IonText>
            )}
            {podcasts.map((podcast: Podcast) => (
              <IonCol size="12" sizeMd="6" key={podcast.id}>
                <PodcastCard
                  podcast={podcast}
                  showEpisodesButton={true}
                  onViewDetails={(id: number) => {
                    // toggle prikaz epizoda
                    setSelectedPodcastId(selectedPodcastId === id ? null : id);
                  }}
                />
                {selectedPodcastId === podcast.id && (
                  <div style={{ marginTop: "10px" }}>
                    {episodesLoading ? (
                      <IonSpinner name="crescent" />
                    ) : episodes.length > 0 ? (
                      episodes.map((ep) => (
                        <EpisodeCard key={ep.id} episode={ep} />
                      ))
                    ) : (
                      <IonText>Nema epizoda za prikaz</IonText>
                    )}
                  </div>
                )}
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyPodcastsPage;

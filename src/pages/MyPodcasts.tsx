import React, { useContext, useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonText,
  IonButton,
} from "@ionic/react";
import { AuthContext } from "../context/AuthContext";
import PodcastCard, { Podcast } from "../components/PodcastCard";
import EpisodeCard from "../components/EpisodeCard";
import { useMyPodcasts } from "../hooks/useMyPodcasts";
import { useEpisodes } from "../hooks/useEpisodes";
import AddPodcastForm from "../components/AddPodcastForm";
import AddEpisodeForm from "../components/AddEpisodeForm";
import EditPodcastForm from "../components/EditPodcastForm";
import api from "../api";

const MyPodcastsPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { podcasts: fetchedPodcasts, loading, error } = useMyPodcasts();

  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [selectedPodcastId, setSelectedPodcastId] = useState<number | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState(false);

  const { episodes, loading: episodesLoading } = useEpisodes(
    selectedPodcastId || undefined
  );

  const [episodeFormOpenForPodcastId, setEpisodeFormOpenForPodcastId] =
    useState<number | null>(null);
  const [episodesList, setEpisodesList] = useState<any[]>([]);

  // 👇 state za edit podkasta
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);

  useEffect(() => {
    if (
      podcasts.length === 0 &&
      fetchedPodcasts &&
      fetchedPodcasts.length > 0
    ) {
      setPodcasts(fetchedPodcasts);
    }
  }, [fetchedPodcasts, podcasts.length]);

  useEffect(() => {
    setEpisodesList(episodes ?? []);
  }, [episodes]);

  // --- Handleri ---
  const handleAddEpisode = (podcastId: number) => {
    setEpisodeFormOpenForPodcastId(
      episodeFormOpenForPodcastId === podcastId ? null : podcastId
    );
  };

  const handleEpisodeCreated = (newEpisode: any, forPodcastId?: number) => {
    setEpisodesList((prev) => [newEpisode, ...prev]);
    if (forPodcastId) setEpisodeFormOpenForPodcastId(null);
    setSelectedPodcastId(newEpisode.podcast_id ?? forPodcastId ?? null);
  };

  const handlePodcastCreated = (newPodcast: Podcast) => {
    setPodcasts((prev) => [newPodcast, ...prev]);
    setEpisodeFormOpenForPodcastId(newPodcast.id);
    setSelectedPodcastId(newPodcast.id);
    setShowAddForm(false);
  };

  const handleDeletePodcast = async (id: number) => {
    if (!window.confirm("Da li si sigurna da želiš da obrišeš podkast?"))
      return;
    try {
      await api.delete(`/podcasts/${id}`);
      setPodcasts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Greška prilikom brisanja podkasta.");
    }
  };

  const handleDeleteEpisode = async (id: number) => {
    if (!window.confirm("Da li želiš da obrišeš ovu epizodu?")) return;
    try {
      await api.delete(`/episodes/${id}`);
      setEpisodesList((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      alert("Greška prilikom brisanja epizode.");
    }
  };

  const handleUpdateEpisode = (updated: any) => {
    setEpisodesList((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{ "--padding-top": "70px" } as React.CSSProperties}
      >
        <h2>Moji podkasti</h2>

        {loading && <IonSpinner name="crescent" />}
        {error && <IonText color="danger">{error}</IonText>}

        <IonButton
          color="primary"
          style={{ marginBottom: "15px", width: "auto" }}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Zatvori formu" : "Dodaj novi podkast"}
        </IonButton>

        {showAddForm && (
          <AddPodcastForm
            onClose={() => setShowAddForm(false)}
            onCreated={handlePodcastCreated}
          />
        )}

        <IonGrid>
          {podcasts.map((podcast) => (
            <IonRow key={podcast.id}>
              <IonCol size="12">
                <PodcastCard
                  podcast={podcast}
                  showEpisodesButton={true}
                  selectedPodcastId={selectedPodcastId}
                  onViewDetails={(id: number) =>
                    setSelectedPodcastId(selectedPodcastId === id ? null : id)
                  }
                  onAddEpisode={handleAddEpisode}
                  isEpisodeFormOpen={episodeFormOpenForPodcastId === podcast.id}
                  isMyPodcastsPage={true}
                  onEditPodcast={(p) => setEditingPodcast(p)}
                  onDeletePodcast={handleDeletePodcast}
                />

                {/* Edit forma podkasta */}
                {editingPodcast && editingPodcast.id === podcast.id && (
                  <EditPodcastForm
                    podcast={editingPodcast}
                    setPodcasts={setPodcasts}
                    onClose={() => setEditingPodcast(null)}
                  />
                )}

                {/* AddEpisodeForm */}
                {episodeFormOpenForPodcastId === podcast.id && (
                  <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                    <AddEpisodeForm
                      podcast={podcast}
                      onCreated={(newEpisode: any) =>
                        handleEpisodeCreated(newEpisode, podcast.id)
                      }
                      onClose={() => setEpisodeFormOpenForPodcastId(null)}
                    />
                  </div>
                )}

                {/* Lista epizoda */}
                {selectedPodcastId === podcast.id && (
                  <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                    {episodesLoading ? (
                      <IonSpinner name="crescent" />
                    ) : episodesList.length > 0 ? (
                      episodesList.map((ep) => (
                        <EpisodeCard
                          key={ep.id}
                          episode={ep}
                          isMyPodcastsPage={true}
                          onUpdated={handleUpdateEpisode}
                          onDeleted={handleDeleteEpisode}
                        />
                      ))
                    ) : (
                      <IonText>Nema epizoda za prikaz</IonText>
                    )}
                  </div>
                )}
              </IonCol>
            </IonRow>
          ))}

          {!loading && podcasts.length === 0 && (
            <IonText>Nema podkasta za prikaz</IonText>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyPodcastsPage;

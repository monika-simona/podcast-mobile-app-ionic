import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";
import PodcastCard from "../components/PodcastCard";
import { podcasts as allPodcasts } from "../data/dummyData";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Home: React.FC = () => {
  const history = useHistory();

  // Filter state
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState<"title" | "author">("title");

  // Filtrirani podcasti
  const filteredPodcasts = allPodcasts.filter((podcast) =>
    filterBy === "title"
      ? podcast.title.toLowerCase().includes(query.toLowerCase())
      : podcast.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Podkasti</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Search bar */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <IonInput
            placeholder={
              filterBy === "title" ? "Pretraži po nazivu" : "Pretraži po autoru"
            }
            value={query}
            onIonChange={(e) => setQuery(e.detail.value!)}
            style={{ flex: 1 }}
          />
          <IonSelect
            value={filterBy}
            placeholder="Filter"
            onIonChange={(e) => setFilterBy(e.detail.value)}
          >
            <IonSelectOption value="title">Naziv</IonSelectOption>
            <IonSelectOption value="author">Autor</IonSelectOption>
          </IonSelect>
          <IonButton onClick={() => setQuery("")}>Reset</IonButton>
        </div>

        {/* Lista podcasta */}
        <IonGrid>
          <IonRow>
            {filteredPodcasts.length > 0 ? (
              filteredPodcasts.map((podcast) => (
                <IonCol size="12" sizeMd="6" key={podcast.id}>
                  <PodcastCard
                    podcast={podcast}
                    onViewDetails={(id) => history.push(`/podcasts/${id}`)}
                  />
                </IonCol>
              ))
            ) : (
              <p>Nema podcasta za prikaz</p>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
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
  IonSpinner,
} from "@ionic/react";
import PodcastCard from "../components/PodcastCard";
import { usePodcasts, Podcast } from "../hooks/usePodcasts";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();

  // Kontrolisani elementi
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState<"title" | "author">("title");

  // Stanje za aktivnu pretragu (koja se šalje hook-u)
  const [activeQuery, setActiveQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"title" | "author">("title");

  // Hook za podkaste sa backend-a
  const { podcasts, loading, error } = usePodcasts(activeQuery, activeFilter);

  // Dugme Search postavlja activeQuery i activeFilter
  const handleSearch = () => {
    setActiveQuery(searchText);
    setActiveFilter(filterBy);
  };

  // Dugme Reset
  const handleReset = () => {
    setSearchText("");
    setFilterBy("title");
    setActiveQuery("");
    setActiveFilter("title");
  };

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
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          />
          <IonSelect
            value={filterBy}
            placeholder="Filter"
            onIonChange={(e) => setFilterBy(e.detail.value)}
          >
            <IonSelectOption value="title">Naziv</IonSelectOption>
            <IonSelectOption value="author">Autor</IonSelectOption>
          </IonSelect>
          <IonInput type="text"></IonInput>
          <IonButton onClick={handleSearch}>Search</IonButton>
          <IonButton onClick={handleReset}>Reset</IonButton>
        </div>

        {/* Loading/Error */}
        {loading && <IonSpinner name="crescent" />}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Lista podcasta */}
        <IonGrid>
          <IonRow>
            {!loading && podcasts.length === 0 && (
              <p>Nema podcasta za prikaz</p>
            )}
            {podcasts.map((podcast: Podcast) => (
              <IonCol size="12" sizeMd="6" key={podcast.id}>
                <PodcastCard
                  podcast={podcast}
                  onViewDetails={(id: number) =>
                    history.push(`/podcasts/${id}`)
                  }
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { AuthProvider } from "./context/AuthContext";

/* Pages */
import Home from "./pages/Home";
import PodcastDetails from "./pages/PodcastDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPodcasts from "./pages/MyPodcasts";

/* Components */
import NavBar from "./components/NavBar";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import PlayerShell from "./components/PlayerShell";

/* Ionic CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";

/* Theme */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <AudioPlayerProvider>
          <NavBar />
          <PlayerShell>
            <IonReactRouter>
              <IonRouterOutlet id="main-content">
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/podcasts/:id" component={PodcastDetails} />
                <Route exact path="/my-podcasts" component={MyPodcasts} />
                {/* Default route */}
                <Route exact path="/" render={() => <Redirect to="/home" />} />
              </IonRouterOutlet>
            </IonReactRouter>
          </PlayerShell>
        </AudioPlayerProvider>
      </AuthProvider>
    </IonApp>
  );
};

export default App;

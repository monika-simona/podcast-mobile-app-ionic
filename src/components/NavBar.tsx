import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Podcast App</IonTitle>

          {/* Prijava / Logout */}
          <IonButtons slot="end">
            {user ? (
              <IonButton onClick={logout}>{user.name} (Logout)</IonButton>
            ) : (
              <>
                <IonButton routerLink="/login">Login</IonButton>
                <IonButton routerLink="/register">Register</IonButton>
              </>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Side menu */}
      <IonMenu side="start" contentId="main-content">
        <IonContent>
          <IonList>
            <IonItem button routerLink="/home">
              <IonLabel>Home</IonLabel>
            </IonItem>
            {user && (
              <IonItem button routerLink="/my-podcasts">
                <IonLabel>My Podcasts</IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default NavBar;

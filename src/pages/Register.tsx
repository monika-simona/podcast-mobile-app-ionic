import React, { useState, useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register: React.FC = () => {
  const { register } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleRegister = async () => {
    try {
      await register(name, email, password, passwordConfirm);
      history.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Confirm Password</IonLabel>
          <IonInput
            type="password"
            value={passwordConfirm}
            onIonChange={(e) => setPasswordConfirm(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleRegister}>
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;

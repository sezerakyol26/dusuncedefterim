import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

let app: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
} catch (e) {
  console.warn("Firebase App başlatılamadı, yerel mod aktif:", e);
}

try {
  if (app) {
    try {
      if (firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== "(default)") {
        firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);
      } else {
        firestoreDb = getFirestore(app);
      }
    } catch {
      firestoreDb = getFirestore(app);
    }
  }
} catch (e) {
  console.warn("Firestore servisi başlatılamadı, yerel hafıza (localStorage) aktif:", e);
}

export const db = firestoreDb as Firestore;
export { app };

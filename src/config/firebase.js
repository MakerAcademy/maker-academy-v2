import { getApp, getApps, initializeApp } from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const dev = {
  apiKey: "AIzaSyA_p9itKDj7PuilMKxf97JcXyIlgbe1zYE",
  authDomain: "maker-academy-dev.firebaseapp.com",
  projectId: "maker-academy-dev",
  storageBucket: "maker-academy-dev.appspot.com",
  messagingSenderId: "428837408036",
  appId: "1:428837408036:web:b30afc85884c1d9015b7b1",
  measurementId: "G-D2JBY3QFME",
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth();

// Initialize Firebase
if (typeof window !== "undefined" && !getApps().length) {
  setPersistence(auth, browserSessionPersistence);
  window.firebase = app;
}

export const providerGoogle = new GoogleAuthProvider();

export const db = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);

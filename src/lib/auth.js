import { auth, providerGoogle } from "@config/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const handleGoogleLogin = async () => {
  try {
    const res = await signInWithPopup(auth, providerGoogle);

    if (res.user) {
      window.location.href = "/";
    }

    return res.user;
  } catch (error) {
    return error;
  }
};

export const handleLogin = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (res.user) {
      window.location.href = "/";
    }

    return res.user;
  } catch (error) {
    return error;
  }
};

export const handleRegister = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res.user) {
      window.location.href = "/";
    }

    return res.user;
  } catch (error) {
    return error;
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth).then(() => (window.location.href = "/"));
  } catch (error) {
    return error;
  }
};

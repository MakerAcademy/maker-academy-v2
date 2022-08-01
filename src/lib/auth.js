import { auth, providerGoogle } from "@config/firebase";

import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const handleGoogleLogin = async () => {
  try {
    const res = await signInWithPopup(auth, providerGoogle);

    const details = getAdditionalUserInfo(res);

    return { success: true, user: res.user, isNewUser: details.isNewUser };
  } catch (error) {
    throw { error: true, message: error.message };
  }
};

export const handleLogin = async (email, password) => {
  try {
    if (!email && !password) throw { error: true, message: error.message };

    const res = await signInWithEmailAndPassword(auth, email, password);

    return { success: true, user: res.user };
  } catch (error) {
    throw { error: true, message: error.message };
  }
};

export const handleRegister = async (email, password) => {
  try {
    if (!email && !password) throw { error: true, message: error.message };

    const res = await createUserWithEmailAndPassword(auth, email, password);

    return { success: true, user: res.user };
  } catch (error) {
    throw { error: true, message: error.message };
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth).then(() => (window.location.href = "/"));
  } catch (error) {
    throw { error: true, message: error.message };
  }
};

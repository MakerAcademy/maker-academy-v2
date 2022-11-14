import { auth, providerGoogle } from "@config/firebase";

import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { generate } from "generate-password";
import { findWalletUser, updateUser, updateWalletUser } from "./user";

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

export const handleRegister = async (firstName, lastName, email, password) => {
  try {
    if (!firstName && !lastName && !email && !password)
      throw { error: true, message: "Missing Fields" };

    const displayName = `${firstName} ${lastName}`.trim();

    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (res.user) {
      await updateProfile(res.user, {
        displayName,
      });

      await updateUser(res.user.uid, {
        firstName,
        lastName,
        displayName,
      });

      await sendUserEmailVerification(res.user);
    } else {
      throw new Error();
    }

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

export const emailPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const sendUserEmailVerification = async () => {
  try {
    sendEmailVerification(auth.currentUser);

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const callableGetCustomToken = async (address) => {
  try {
    const functions = getFunctions();
    const callFunction = httpsCallable(functions, "auth-customTokenOnCall");
    return await callFunction({ address });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleTokenLogin = async (_token) => {
  try {
    const res = await signInWithCustomToken(auth, _token);

    const details = getAdditionalUserInfo(res);

    return { success: true, user: res.user, isNewUser: details.isNewUser };
  } catch (error) {
    throw { error: true, message: error.message };
  }
};

export const handleWalletRegister = async (address) => {
  try {
    if (!address) throw { error: true, message: "Missing Fields" };

    const email = `${address}@academy.makerdao.network`;

    const _found = await findWalletUser(address);

    console.log(1, _found);

    if (_found) {
      const res = await callableGetCustomToken(address).then((res) => {
        handleTokenLogin(res.data?.customToken);
      });

      return res;
    } else {
      const firstName = "Wallet";
      const lastName = "User";
      const displayName = "Wallet User";
      const password = generate({
        length: 12,
        numbers: true,
      });

      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (res.user) {
        await updateProfile(res.user, {
          displayName,
        });

        await updateUser(res.user.uid, {
          firstName,
          lastName,
          displayName,
        });

        await updateWalletUser(res.user.uid, {
          address,
        });
      } else {
        throw new Error();
      }
      return { success: true, user: res.user };
    }
  } catch (error) {
    console.log(error);
    throw { error: true, message: error.message };
  }
};

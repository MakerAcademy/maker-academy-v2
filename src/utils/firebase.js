import { auth, db, providerGoogle } from "@config/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  limit,
  getDoc,
  getDocs,
} from "@firebase/firestore";

export const handleGoogleLogin = async () => {
  return await signInWithPopup(auth, providerGoogle).then((res) => {
    if (res.user) {
      window.location.href = "/";
    }
  });
};

export const handleLogin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password).then((res) => {
    if (res.user) {
      window.location.href = "/";
    }
  });
};

export const handleRegister = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password).then(
    (res) => {
      if (res.user) {
        window.location.href = "/";
      }
    }
  );
};

export const handleSignOut = async () => {
  return await signOut(auth).then(() => (window.location.href = "/"));
};

export const getAllContacts = (callback) => {
  const q = query(collection(db, "contacts"));
  const unsub = onSnapshot(q, (snap) => {
    let arr = [];
    snap.docs.map((doc) => arr.push(doc.data()));

    if (callback) callback(arr);

    return arr;
  });

  return unsub;
};

export const getContact = async (uid, callback) => {
  const q = await query(
    collection(db, "contacts"),
    where("uid", "==", uid),
    limit(1)
  );

  const snap = await getDocs(q);

  return snap?.docs?.[0]?.data?.();
};

export const getUser = async (uid, callback) => {
  const q = await getDoc(doc(db, `users/${uid}`));

  return q.data?.();
};

export const editContact = (cid, data = {}, callback) => {
  const docRef = doc(db, "contacts", cid);
  const payload = { ...data, updateTimestamp: serverTimestamp() };

  updateDoc(docRef, payload).then((res) => callback?.(res));
};

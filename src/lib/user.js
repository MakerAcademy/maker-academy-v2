import { db } from "@config/firebase";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "@firebase/firestore";

export const getContact = async (uid) => {
  try {
    const q = await query(
      collection(db, "contacts"),
      where("uid", "==", uid),
      limit(1)
    );

    const snap = await getDocs(q);

    return snap?.docs?.[0]?.data?.();
  } catch (error) {
    return error;
  }
};

export const getUser = async (uid) => {
  try {
    const q = await getDoc(doc(db, `users/${uid}`));
    return q.data?.();
  } catch (error) {
    return error;
  }
};

export const editContact = (cid, data = {}, callback) => {
  try {
    const docRef = doc(db, "contacts", cid);
    const payload = { ...data, updateTimestamp: serverTimestamp() };

    updateDoc(docRef, payload).then((res) => callback?.(res));
  } catch (error) {
    return error;
  }
};

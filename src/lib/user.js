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
import { cleanObject } from "@utils/helpers";

export const getContact = async (uid) => {
  try {
    const q = query(
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

export const updateContact = async (cid, data = {}) => {
  try {
    const docRef = doc(db, "contacts", cid);
    const payload = cleanObject({
      ...data,
      updateTimestamp: serverTimestamp(),
    });

    await updateDoc(docRef, payload);

    return { success: true, payload };
  } catch (error) {
    return error;
  }
};

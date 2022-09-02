import { db } from "@config/firebase";
import { cleanObject } from "@utils/helpers";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const submitBacklog = async (cid, data = {}) => {
  try {
    // new content
    const contentRef = doc(collection(db, "backlogs"));
    const contentPayload = {
      author: cid,
      id: contentRef.id,
      status: "open",
      ...data,
    };
    const contentRes = await setDoc(contentRef, {
      ...cleanObject(contentPayload),
      timestamp: serverTimestamp(),
    });

    return { success: true, payload: { ...data, id: contentRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateBacklog = async (docId, data = {}) => {
  try {
    const _ref = doc(db, "backlogs", docId);
    await updateDoc(_ref, {
      ...data,
    });

    return { success: true, payload: data };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getBacklog = async (cid) => {
  try {
    const docRef = doc(db, "backlogs", cid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, response: docSnap.data() };
    } else {
      return console.log("cid", cid, "No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const listenBacklogs = (callback) => {
  const docsRef = collection(db, "backlogs");

  const q = query(docsRef);

  const unsub = onSnapshot(q, (snapshot) => {
    const result = [];

    snapshot.docs.forEach((doc) => {
      result.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    callback?.(result);
  });

  return unsub;
};

export const deleteBacklog = async (id) => {
  try {
    await deleteDoc(doc(db, "backlogs", id));

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

import { db } from "@config/firebase";
import { cleanObject } from "@utils/helpers";
import {
  setDoc,
  collection,
  doc,
  serverTimestamp,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  orderBy,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { submitDocument } from "./document";

export const submitDraft = async (cid, data = {}) => {
  try {
    // new content
    const contentRef = doc(collection(db, "drafts"));
    const contentPayload = {
      author: cid,
      id: contentRef.id,
      contentType: "document",
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

export const updateDraft = async (docId, data = {}) => {
  try {
    const _ref = doc(db, "drafts", docId);
    await updateDoc(_ref, {
      ...data,
    });

    return { success: true, payload: data };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDraft = async (cid) => {
  const docRef = doc(db, "drafts", cid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { success: true, response: docSnap.data() };
  } else {
    return console.log("cid", cid, "No such document!");
  }
};

export const listenUserDrafts = (cid, callback) => {
  const docsRef = collection(db, "drafts");

  const q = query(docsRef, where("author", "==", cid));

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

export const publishDraft = async (data) => {
  try {
    const { contentType, author, id } = data;

    if (contentType === "document") {
      await submitDocument(author, data);
    }

    await deleteDoc(doc(db, "drafts", id));

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDraft = async (id) => {
  try {
    await deleteDoc(doc(db, "drafts", id));

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

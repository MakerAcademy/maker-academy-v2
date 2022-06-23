import { db } from "@config/firebase";
import {
  setDoc,
  collection,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

export const submitDocument = async (cid, data = {}) => {
  try {
    // Add to documents
    const docRef = doc(collection(db, "documents"));
    const docPayload = {
      ...data,
      author: cid,
      id: docRef.id,
      timestamp: serverTimestamp(),
    };
    const docRes = await setDoc(docRef, docPayload);

    // new content
    const contentRef = doc(collection(db, "content"));
    const contentPayload = {
      author: cid,
      published: docRef.id,
      id: contentRef.id,
      private: !!data.private,
      contentType: "document",
      likes: [],
      views: 0,
      contributors: [],
      editRequests: [],
      status: "pending",
      timestamp: serverTimestamp(),
    };
    const contentRes = await setDoc(contentRef, contentPayload);

    return { ...data, id: contentRef.id };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDocument = async (cid) => {
  const docRef = doc(db, "documents", cid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return console.log("cid", cid, "No such document!");
  }
};

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
} from "firebase/firestore";
import { getCourse } from "./course";
import { getDocument } from "./document";

export const getUserEditRequests = async (cid) => {
  try {
    const docsRef = collection(db, "edit_requests");

    const q = query(
      docsRef,
      orderBy("timestamp", "desc"),
      where("author", "==", cid)
    );

    const querySnapshot = await getDocs(q);

    const snapshotData = [];
    querySnapshot.forEach(async (doc) => {
      snapshotData.push(doc.data());
    });

    let data = await Promise.all(
      snapshotData.map(async (content, i) => {
        const { contentType, published } = content;

        const _fetch =
          contentType == "course"
            ? await getCourse(published)
            : await getDocument(published);

        const { id, timestamp, ...rest } = _fetch;

        return { ...content, ...rest };
      })
    );

    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const newDocumentEditRequest = async (cid, data = {}) => {
  try {
    // return { success: true, payload: { ...data } };

    // Add to documents
    const docRef = doc(collection(db, "documents"));
    const docPayload = {
      ...data,
      updateAuthor: cid,
      id: docRef.id,
      updateTimestamp: serverTimestamp(),
    };
    const docRes = await setDoc(docRef, docPayload);

    // new edit request
    const erRef = doc(collection(db, "edit_requests"));
    const erPayload = {
      author: data.author,
      updateAuthor: cid,
      published: docRef.id,
      id: erRef.id,
      contentType: "document",
      status: "pending",
      timestamp: serverTimestamp(),
    };
    const erRes = await setDoc(erRef, erPayload);

    return { success: true, payload: { ...data, id: erRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

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
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { getCourse } from "./course";
import { getDocument } from "./document";

export const getUserEditRequests = async (cid) => {
  try {
    if (!cid) return null;

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

        const { id, timestamp, ...rest } = _fetch || {};

        return { ...content, ...rest };
      })
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const submitDocumentEditRequest = async (cid, data = {}, contentId) => {
  try {
    // return { success: true, payload: { ...data } };

    // Add to documents
    const docRef = doc(collection(db, "documents"));
    const docPayload = {
      ...data,
      id: docRef.id,
    };
    const docRes = await setDoc(docRef, docPayload);

    // new edit request
    const erRef = doc(collection(db, "edit_requests"));
    const erPayload = {
      author: data.author,
      contentId,
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

export const acceptEditRequest = async (data) => {
  try {
    const { contentId, id, published } = data;

    //searchable term
    let _searchTerm = `${data?.title || ""} ${data?.brand || ""} ${
      data?.shortDescription || ""
    } ${data?.level || ""} ${data?.category || ""}`
      ?.toLowerCase()
      ?.replace(/[^a-zA-Z ]/g, "")
      ?.split(" ")
      ?.filter((i) => i?.length > 4);

    //remove duplicate words
    _searchTerm = Array.from(new Set(_searchTerm)).filter(Boolean);

    // new content
    const contentRef = doc(db, "content", contentId);
    const contentPayload = {
      published,
      private: !!data?.private,
      updatedTimestamp: serverTimestamp(),
      filters: {
        brand: data?.brand || "none",
        searchTerm: _searchTerm,
        category: data?.category || "",
        level: data?.level || "",
      },
    };
    await updateDoc(contentRef, contentPayload, { merge: true });

    await deleteDoc(doc(db, "edit_requests", id));

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const declineEditRequest = async (id) => {
  try {
    await deleteDoc(doc(db, "edit_requests", id));

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

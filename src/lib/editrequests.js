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
  onSnapshot,
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

export const listenUserEditRequests = (cid, callback) => {
  const docsRef = collection(db, "edit_requests");

  const q = query(
    docsRef,
    orderBy("timestamp", "desc"),
    where("author", "==", cid)
  );

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

    // new edit request
    const erRef = doc(collection(db, "edit_requests"));
    const erPayload = {
      updateAuthor: cid,
      author: data.author,
      contentId,
      published: docRef.id,
      id: erRef.id,
      contentType: "document",
      status: "pending",
      filters: {
        brand: data?.brand || "none",
        searchTerm: _searchTerm,
        category: data?.category || "",
        level: data?.level || "",
      },
      metadata: {
        level: data?.level || "",
        title: data?.title || "",
        brand: data?.brand || "",
        shortDescription: data?.shortDescription || "",
        category: data?.category || "",
        duration: data?.duration || "",
      },
    };
    const erRes = await setDoc(erRef, {
      ...cleanObject(erPayload),
      timestamp: serverTimestamp(),
    });

    return { success: true, payload: { ...data, id: erRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const submitCourseEditRequest = async (cid, data = {}, contentId) => {
  try {
    // return { success: true, payload: { ...data } };

    // Add to documents
    const docRef = doc(collection(db, "courses"));
    const docPayload = {
      ...data,
      id: docRef.id,
    };
    const docRes = await setDoc(docRef, docPayload);

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

    // new edit request
    const erRef = doc(collection(db, "edit_requests"));
    const erPayload = {
      updateAuthor: cid,
      author: data.author,
      contentId,
      published: docRef.id,
      id: erRef.id,
      contentType: "document",
      status: "pending",
      metadata: {
        level: data?.level || "",
        title: data?.title || "",
        brand: data?.brand || "",
        shortDescription: data?.shortDescription || "",
        category: data?.category || "",
        duration: data?.duration || "",
      },
      filters: {
        brand: data?.brand || "none",
        searchTerm: _searchTerm,
        category: data?.category || "",
        level: data?.level || "",
      },
    };
    const erRes = await setDoc(erRef, {
      ...cleanObject(erPayload),
      timestamp: serverTimestamp(),
    });

    return { success: true, payload: { ...data, id: erRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const acceptEditRequest = async (data) => {
  try {
    const { contentId, id, published, filters, metadata } = data;

    // new content
    const contentRef = doc(db, "content", contentId);
    const contentPayload = {
      filters,
      metadata,
      published,
      private: !!data?.private,
    };
    await updateDoc(
      contentRef,
      { ...cleanObject(contentPayload), updatedTimestamp: serverTimestamp() },
      { merge: true }
    );

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

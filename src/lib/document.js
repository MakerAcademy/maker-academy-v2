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

export const submitDocument = async (cid, data = {}) => {
  try {
    // return { success: true, payload: { ...data } };

    // Add to documents
    const docRef = doc(collection(db, "documents"));
    const docPayload = {
      ...data,
      author: cid,
      id: docRef.id,
      timestamp: serverTimestamp(),
    };
    const docRes = await setDoc(docRef, docPayload);

    //searchable term
    let _searchTerm = `${data?.title || ""} ${data?.brand || ""} ${
      data?.shortDescription || ""
    } ${data?.level || ""} ${data?.category || ""}`
      ?.toLowerCase()
      ?.replaceAll("(", "")
      ?.replaceAll(")", "")
      ?.split(" ")
      ?.filter((i) => i.length < 4);

    //remove duplicate words
    _searchTerm = Array.from(new Set(_searchTerm)).filter(Boolean);

    // new content
    const contentRef = doc(collection(db, "content"));
    const contentPayload = {
      author: cid,
      published: docRef.id,
      id: contentRef.id,
      contentType: "document",
      likes: [],
      views: 0,
      status: "pending",
      timestamp: serverTimestamp(),
      private: !!data?.private,
      filters: {
        brand: data?.brand || "none",
        searchTerm: _searchTerm,
        category: data?.category || "",
        level: data?.level || "",
      },
    };
    const contentRes = await setDoc(contentRef, contentPayload);

    return { success: true, payload: { ...data, id: contentRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDocumentWithContent = async (cid, seperate) => {
  try {
    const contentRef = doc(db, "content", cid);
    const contentSnap = await getDoc(contentRef);

    if (contentSnap.exists()) {
      const contentData = contentSnap.data();

      const docRef = doc(db, "documents", contentData.published);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docObj = {
          ...(seperate
            ? {
                document: {
                  ...docSnap.data(),
                  timestamp: contentData.timestamp.toDate().toString(),
                },
              }
            : docSnap.data()),
          ...contentData,
          timestamp: contentData.timestamp.toDate().toString(),
        };

        return docObj;
      }
    }
  } catch (error) {
    console.log("cid", cid, "No such document!");
    throw error;
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

export const getUserDocuments = async (uid) => {
  try {
    const docsRef = collection(db, "content");

    const q = query(
      docsRef,
      where("author", "==", uid),
      where("contentType", "==", "document")
    );

    const querySnapshot = await getDocs(q);

    const snapshotData = [];
    querySnapshot.forEach(async (doc) => {
      snapshotData.push(doc.data());
    });

    let data = await Promise.all(
      snapshotData.map(async (content, i) => {
        const { contentType, published } = content;

        const _fetch = await getDocument(published);

        const { id, timestamp, ...rest } = _fetch;

        return { ...content, ...rest };
      })
    );

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const likeDocument = async (contentId, cid) => {
  console.log(contentId, cid);
  try {
    const _ref = doc(db, "content", contentId);

    await updateDoc(_ref, {
      likes: arrayUnion(cid),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unlikeDocument = async (contentId, cid) => {
  try {
    const _ref = doc(db, "content", contentId);

    await updateDoc(_ref, {
      likes: arrayRemove(cid),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
} from "firebase/firestore";

const generateSearchTerm = (data) => {
  let _searchTerm = `${data?.title || ""} ${data?.brand || ""} ${
    data?.shortDescription || ""
  } ${data?.level || ""} ${data?.category || ""}`
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z ]/g, "")
    ?.split(" ")
    ?.filter((i) => i?.length > 4);

  //remove duplicate words
  _searchTerm = Array.from(new Set(_searchTerm)).filter(Boolean);

  return _searchTerm;
};

export const submitDocument = async (cid, data = {}) => {
  try {
    // Add to documents
    const docRef = doc(collection(db, "documents"));
    const docPayload = {
      ...data,
      author: cid,
      id: docRef.id,
    };
    const docRes = await setDoc(docRef, cleanObject(docPayload));

    //searchable term
    let _searchTerm = generateSearchTerm(data);

    //new content
    const contentRef = doc(collection(db, "content"));
    const contentPayload = {
      author: cid,
      published: docRef.id,
      id: contentRef.id,
      contentType: "document",
      likes: 0,
      views: 0,
      status: "pending",
      private: !!data?.private,
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

export const updateDocument = async (data = {}) => {
  try {
    const { published, id, timestamp, updatedTimestamp, ...other } = data;

    // Update Document
    const docRef = doc(db, "documents", published);
    const docPayload = {
      ...other,
    };
    const docRes = await updateDoc(docRef, cleanObject(docPayload));

    //searchable term
    let _searchTerm = generateSearchTerm(data);

    //new content
    const contentRef = doc(db, "content", id);
    const contentPayload = {
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
    const contentRes = await updateDoc(contentRef, {
      ...cleanObject(contentPayload),
      updatedTimestamp: serverTimestamp(),
    });

    return { success: true, payload: data };
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
                  timestamp:
                    contentData.timestamp?.toDate?.()?.toString?.() || null,
                  updatedTimestamp:
                    contentData?.updatedTimestamp?.toDate?.()?.toString?.() ||
                    null,
                },
              }
            : docSnap.data()),
          ...contentData,
          timestamp: contentData.timestamp?.toDate?.()?.toString?.() || null,
          updatedTimestamp:
            contentData?.updatedTimestamp?.toDate?.()?.toString?.() || null,
        };

        return { success: true, response: docObj };
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
      where("contentType", "in", ["document", "assessment"])
    );

    const querySnapshot = await getDocs(q);

    const snapshotData = [];
    querySnapshot.forEach(async (doc) => {
      snapshotData.push(doc.data());
    });

    return snapshotData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const likeDocument = async (contentId, cid) => {
  try {
    const _ref = doc(db, "contacts", cid);
    await updateDoc(_ref, {
      likedContent: arrayUnion(contentId),
    });

    const contentRef = doc(db, "content", contentId);
    await updateDoc(contentRef, {
      likes: increment(1),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unlikeDocument = async (contentId, cid) => {
  try {
    const _ref = doc(db, "contacts", cid);
    await updateDoc(_ref, {
      likedContent: arrayRemove(contentId),
    });

    const contentRef = doc(db, "content", contentId);
    await updateDoc(contentRef, {
      likes: increment(-1),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserReadDocument = async (cid, docId) => {
  try {
    const _ref = doc(db, "contacts", cid);
    await updateDoc(_ref, {
      readDocuments: arrayUnion(docId),
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

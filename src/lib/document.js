import { db } from "@config/firebase";
import { extractFileInObject } from "@utils/helperFunctions";
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
import { uploadFile } from "./storage";

export const DEFAULT_CONTENT_THUMBNAIL =
  "https://firebasestorage.googleapis.com/v0/b/maker-academy-c22f7.appspot.com/o/app%2Fcourse_thumbs%2Fdefault.png?alt=media&token=4e00665e-a0d0-4df1-a140-a3ee116340e6";

export const generateDocumentSearchTerm = (data) => {
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
    const { obj, files } = extractFileInObject(data);

    // return console.log(obj, files);

    // Add to documents
    const docRef = doc(collection(db, "documents"));
    const docPayload = {
      ...obj,
      thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
      author: cid,
      id: docRef.id,
    };
    const docRes = await setDoc(docRef, cleanObject(docPayload));

    //searchable term
    let _searchTerm = generateDocumentSearchTerm(obj);

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
      private: !!obj?.private,
      filters: {
        brand: obj?.brand || "none",
        searchTerm: _searchTerm,
        category: obj?.category || "",
        level: obj?.level || "",
      },
      metadata: {
        level: obj?.level || "",
        title: obj?.title || "",
        brand: obj?.brand || "",
        shortDescription: obj?.shortDescription || "",
        category: obj?.category || "",
        duration: obj?.duration || "",
        thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
      },
    };
    const contentRes = await setDoc(contentRef, {
      ...cleanObject(contentPayload),
      timestamp: serverTimestamp(),
    });

    // Upload files
    if (files && Object.keys(files)) {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(
          `/content/${contentRef.id}/${key}.${extension}`,
          value
        ).then(async (res) => {
          if (res?.success) {
            await updateDoc(docRef, { [key]: res?.metadata?.downloadURL });
            await updateDoc(
              contentRef,
              {
                [`metadata.${key}`]: res?.metadata?.downloadURL,
              },
              { merge: true }
            );
          }
        });
      }
    }

    return { success: true, payload: { ...obj, id: contentRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateDocument = async (data = {}, disableUpdatedTimestamp) => {
  try {
    const { obj, files } = extractFileInObject(data);

    const { published, id, timestamp, updatedTimestamp, ...other } = obj;

    // Update Document
    const docRef = doc(db, "documents", published);
    const docPayload = {
      ...other,
      thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
    };
    const docRes = await updateDoc(docRef, cleanObject(docPayload));

    //searchable term
    let _searchTerm = generateDocumentSearchTerm(obj);

    //update content
    const contentRef = doc(db, "content", id);
    const contentPayload = {
      filters: {
        brand: obj?.brand || "none",
        searchTerm: _searchTerm,
        category: obj?.category || "",
        level: obj?.level || "",
      },
      metadata: {
        level: obj?.level || "",
        title: obj?.title || "",
        brand: obj?.brand || "",
        shortDescription: obj?.shortDescription || "",
        category: obj?.category || "",
        duration: obj?.duration || "",
        thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
      },
      private: !!obj?.private,
    };
    const contentRes = await updateDoc(contentRef, {
      ...cleanObject(contentPayload),
      ...(disableUpdatedTimestamp
        ? {}
        : { updatedTimestamp: serverTimestamp() }),
    });

    // Upload files
    if (files && Object.keys(files)) {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(
          `/content/${contentRef.id}/${key}.${extension}`,
          value
        ).then(async (res) => {
          if (res?.success) {
            await updateDoc(docRef, { [key]: res?.metadata?.downloadURL });
            await updateDoc(
              contentRef,
              {
                [`metadata.${key}`]: res?.metadata?.downloadURL,
              },
              { merge: true }
            );
          }
        });
      }
    }

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
    } else {
      throw "Doc not found";
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

export const getAllDocumentsAdmin = async (uid) => {
  try {
    const docsRef = collection(db, "content");

    const q = query(
      docsRef,
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

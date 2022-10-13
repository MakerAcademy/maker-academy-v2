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
  orderBy,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { generateCourseSearchTerm, getCourse } from "./course";
import {
  DEFAULT_CONTENT_THUMBNAIL,
  generateDocumentSearchTerm,
  getDocument,
} from "./document";
import { uploadFile } from "./storage";

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

export const submitDocumentEditRequest = async (
  cid,
  data = {},
  contentId,
  oldPublished
) => {
  try {
    const { obj, files } = extractFileInObject(data);

    // Add to documents
    const docRef = doc(collection(db, "documents"));
    const docPayload = {
      ...data,
      thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
      id: docRef.id,
    };
    const docRes = await setDoc(docRef, docPayload);

    //searchable term
    let _searchTerm = generateDocumentSearchTerm(obj);

    // new edit request
    const erRef = doc(collection(db, "edit_requests"));
    const erPayload = {
      updateAuthor: cid,
      author: obj.author,
      contentId,
      published: docRef.id,
      oldPublished,
      id: erRef.id,
      contentType: "document",
      status: "pending",
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
        thumbnail: obj?.thumbnail,
      },
      private: !!obj?.private,
    };
    const erRes = await setDoc(erRef, {
      ...cleanObject(erPayload),
      timestamp: serverTimestamp(),
    });

    // Upload files
    if (files && Object.keys(files)) {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(
          `/content/${erRes.id}/${key}.${extension}`,
          value
        ).then(async (res) => {
          if (res?.success) {
            await updateDoc(docRef, { [key]: res?.metadata?.downloadURL });
            await updateDoc(
              erRes,
              {
                [`metadata.${key}`]: res?.metadata?.downloadURL,
              },
              { merge: true }
            );
          }
        });
      }
    }

    return { success: true, payload: { ...obj, id: erRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const submitCourseEditRequest = async (cid, data = {}, contentId) => {
  try {
    const { obj, files } = extractFileInObject(data);

    // Add to documents
    const docRef = doc(collection(db, "courses"));
    const docPayload = {
      ...obj,
      id: docRef.id,
    };
    const docRes = await setDoc(docRef, docPayload);

    const _allDocs = obj?.curriculum?.flatMap?.((n) => n.documents);

    //searchable term
    let _searchTerm = generateCourseSearchTerm(obj);

    // new edit request
    const erRef = doc(collection(db, "edit_requests"));
    const erPayload = {
      updateAuthor: cid,
      author: obj.author,
      contentId,
      published: docRef.id,
      id: erRef.id,
      contentType: "document",
      status: "pending",
      metadata: {
        level: obj?.level || "",
        title: obj?.title || "",
        brand: obj?.brand || "",
        shortDescription: obj?.shortDescription || "",
        category: obj?.category || "",
        duration: obj?.duration || "",
        allDocuments: _allDocs || [],
      },
      filters: {
        brand: obj?.brand || "none",
        searchTerm: _searchTerm,
        category: obj?.category || "",
        level: obj?.level || "",
      },
    };
    const erRes = await setDoc(erRef, {
      ...cleanObject(erPayload),
      timestamp: serverTimestamp(),
    });

    // Upload files
    if (files && Object.keys(files)) {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(
          `/content/${erRef.id}/${key}.${extension}`,
          value
        ).then(async (res) => {
          if (res?.success) {
            await updateDoc(docRef, { [key]: res?.metadata?.downloadURL });
            await updateDoc(
              erRef,
              {
                [`metadata.${key}`]: res?.metadata?.downloadURL,
              },
              { merge: true }
            );
          }
        });
      }
    }

    return { success: true, payload: { ...data, id: erRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const submitAssessmentEditRequest = async (
  cid,
  data = {},
  contentId,
  oldPublished
) => {
  try {
    const { obj, files } = extractFileInObject(data);

    // Add to documents
    const docRef = doc(collection(db, "assessments"));
    const docPayload = {
      ...data,
      thumbnail: obj?.thumbnail || DEFAULT_CONTENT_THUMBNAIL,
      id: docRef.id,
    };
    const docRes = await setDoc(docRef, docPayload);

    //searchable term
    let _searchTerm = generateDocumentSearchTerm(obj);

    // new edit request
    const erRef = doc(collection(db, "edit_requests"));
    const erPayload = {
      updateAuthor: cid,
      author: obj.author,
      contentId,
      published: docRef.id,
      oldPublished,
      id: erRef.id,
      contentType: "document",
      status: "pending",
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
        thumbnail: obj?.thumbnail,
      },
      private: !!obj?.private,
    };
    const erRes = await setDoc(erRef, {
      ...cleanObject(erPayload),
      timestamp: serverTimestamp(),
    });

    // Upload files
    if (files && Object.keys(files)) {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(
          `/content/${erRes.id}/${key}.${extension}`,
          value
        ).then(async (res) => {
          if (res?.success) {
            await updateDoc(docRef, { [key]: res?.metadata?.downloadURL });
            await updateDoc(
              erRes,
              {
                [`metadata.${key}`]: res?.metadata?.downloadURL,
              },
              { merge: true }
            );
          }
        });
      }
    }

    return { success: true, payload: { ...obj, id: erRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const acceptEditRequest = async (data) => {
  try {
    const { contentId, id, published, filters, metadata, oldPublished } = data;

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

    // if (fetchedContent?.published) {
    //   await deleteDoc(doc(db, "documents", oldPublished));
    // }

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const declineEditRequest = async (id, published) => {
  try {
    await deleteDoc(doc(db, "edit_requests", id));
    // await deleteDoc(doc(db, "documents", published));

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

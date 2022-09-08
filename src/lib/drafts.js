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
  orderBy,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { submitDocument } from "./document";

export const submitDraft = async (cid, data = {}) => {
  try {
    const { obj, files } = extractFileInObject(data);

    // new content
    const contentRef = doc(collection(db, "drafts"));
    const contentPayload = {
      author: cid,
      id: contentRef.id,
      contentType: "document",
      ...obj,
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
            await updateDoc(contentRef, { [key]: res?.metadata?.downloadURL });
          }
        });
      }
    }

    return { success: true, payload: { ...data, id: contentRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateDraft = async (docId, data = {}) => {
  try {
    const { obj, files } = extractFileInObject(data);

    const _ref = doc(db, "drafts", docId);
    await updateDoc(_ref, {
      ...obj,
    });

    // Upload files
    if (files && Object.keys(files)) {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(`/content/${_ref.id}/${key}.${extension}`, value).then(
          async (res) => {
            if (res?.success) {
              await updateDoc(_ref, { [key]: res?.metadata?.downloadURL });
            }
          }
        );
      }
    }

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

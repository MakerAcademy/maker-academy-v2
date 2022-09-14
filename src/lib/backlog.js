import { db } from "@config/firebase";
import { extractFileInObject } from "@utils/helperFunctions";
import { cleanObject } from "@utils/helpers";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { uploadFile } from "./storage";

export const submitBacklog = async (cid, data = {}) => {
  try {
    const { obj, files } = extractFileInObject(data);

    // new backlog
    const docRef = doc(collection(db, "backlogs"));
    const payload = {
      author: cid,
      id: docRef.id,
      status: "open",
      ...obj,
    };
    const docRes = await setDoc(docRef, {
      ...cleanObject(payload),
      timestamp: serverTimestamp(),
    });

    // Upload files
    if (files && Object.keys(files)) {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(
          `/backlogs/${docRef.id}/${key}.${extension}`,
          value
        ).then(async (res) => {
          if (res?.success) {
            await updateDoc(docRef, { [key]: res?.metadata?.downloadURL });
            await updateDoc(
              docRef,
              {
                [`metadata.${key}`]: res?.metadata?.downloadURL,
              },
              { merge: true }
            );
          }
        });
      }
    }

    return { success: true, payload: { ...obj, id: docRef.id } };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateBacklog = async (docId, data = {}) => {
  try {
    const _ref = doc(db, "backlogs", docId);
    await updateDoc(_ref, {
      ...data,
    });

    return { success: true, payload: data };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getBacklog = async (cid) => {
  try {
    const docRef = doc(db, "backlogs", cid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, response: docSnap.data() };
    } else {
      return console.log("cid", cid, "No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const listenBacklogs = (callback) => {
  const docsRef = collection(db, "backlogs");

  const q = query(docsRef);

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

export const deleteBacklog = async (id) => {
  try {
    await deleteDoc(doc(db, "backlogs", id));

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

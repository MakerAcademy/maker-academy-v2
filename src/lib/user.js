import { db } from "@config/firebase";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
  onSnapshot,
} from "@firebase/firestore";
import { extractFileInObject } from "@utils/helperFunctions";
import { cleanObject } from "@utils/helpers";
import { uploadFile } from "./storage";

export const listenContactWithUid = (uid, callback) => {
  const q = query(
    collection(db, "contacts"),
    where("uid", "==", uid),
    limit(1)
  );

  const unsub = onSnapshot(q, (snap) => {
    callback?.(snap?.docs?.[0]?.data?.());
  });

  return unsub;
};

export const listenContacts = (callback) => {
  const q = query(collection(db, "contacts"));

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

export const getContact = async (cid) => {
  try {
    const q = await getDoc(doc(db, `contacts/${cid}`));
    return q.data?.();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getContactFromUid = async (uid) => {
  try {
    const q = query(
      collection(db, "contacts"),
      where("uid", "==", uid),
      limit(1)
    );

    const snap = await getDocs(q);

    return snap?.docs?.[0]?.data?.();
  } catch (error) {
    return error;
  }
};

export const getUser = async (uid) => {
  try {
    const q = await getDoc(doc(db, `users/${uid}`));
    return q.data?.();
  } catch (error) {
    return error;
  }
};

export const listenUsers = (callback) => {
  const q = query(collection(db, "users"));

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

export const updateContact = async (
  cid,
  data = {},
  disableUpdatedTimestamp
) => {
  try {
    const { obj, files } = extractFileInObject(data);

    const docRef = doc(db, "contacts", cid);
    const payload = {
      ...obj,
    };

    await updateDoc(docRef, {
      ...cleanObject(payload),
      ...(disableUpdatedTimestamp
        ? {}
        : { updatedTimestamp: serverTimestamp() }),
    }).then(async () => {
      for await (const [key, value] of Object.entries(files)) {
        const extension = value?.name?.split(".")?.[1];

        await uploadFile(`/contacts/${cid}/${key}.${extension}`, value).then(
          async (res) => {
            if (res?.success) {
              await updateContact(
                cid,
                {
                  [key]: res?.metadata?.downloadURL,
                },
                true
              );
            }
          }
        );
      }
    });

    return { success: true, payload };
  } catch (error) {
    console.log(error);
    return error;
  }
};

import { db } from "@config/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  setDoc,
  limit,
  where,
  query,
} from "firebase/firestore";

export const getHomepageContent = async (params) => {
  try {
    const docsRef = collection(db, "content");

    const queryConstraints = [];
    queryConstraints.push(where("status", "==", "published"));
    // queryConstraints.push(
    //   where("contentType", "array-contains-any", ["document", "course"])
    // );
    queryConstraints.push(where("private", "==", false));
    queryConstraints.push(limit(6));

    const q = query(docsRef, orderBy("timestamp", "desc"), ...queryConstraints);

    const querySnapshot = await getDocs(q);

    const snapshotData = [];
    querySnapshot.forEach(async (doc) => {
      snapshotData.push(doc.data());
    });

    return { success: true, payload: snapshotData };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const submitHomepageEmail = async (email) => {
  try {
    if (!email) return false;

    const _ref = doc(db, "marketing", "homepage_emails");
    await setDoc(
      _ref,
      {
        emails: arrayUnion(email),
      },
      { merge: true }
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

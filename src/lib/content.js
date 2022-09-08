import { db } from "@config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

export const getContent = async (params) => {
  const {
    sort: _sort = "timestamp",
    order: _order = "desc",
    limit: _limit,
    startAfter: _startAfter,
    author,
    category,
    categories,
    difficulty,
    showPrivate,
    hideAssessments,
    contentType,
    searchTerm,
  } = params;

  try {
    const docsRef = collection(db, "content");

    const queryConstraints = [];
    queryConstraints.push(where("status", "==", "published"));
    if (_startAfter) queryConstraints.push(startAfter(_startAfter.timestamp));
    if (_limit) queryConstraints.push(limit(_limit));
    if (author) queryConstraints.push(where("filters.brand", "==", author));
    if (contentType)
      queryConstraints.push(where("contentType", "==", contentType));
    if (categories?.length && !searchTerm)
      queryConstraints.push(where("filters.category", "in", categories));

    if (difficulty)
      queryConstraints.push(where("filters.level", "==", difficulty));
    if (!showPrivate) queryConstraints.push(where("private", "==", false));
    if (hideAssessments)
      queryConstraints.push(where("contentType", "!=", "assessment"));
    if (searchTerm) {
      const _term = searchTerm?.toLowerCase()?.trim()?.split(" ");
      queryConstraints.push(
        where("filters.searchTerm", "array-contains-any", _term)
      );
    }
    if (category && searchTerm)
      queryConstraints.push(where("filters.category", "==", category));

    // console.log(queryConstraints);

    const q = query(docsRef, orderBy(_sort, _order), ...queryConstraints);

    const querySnapshot = await getDocs(q);

    const snapshotData = [];
    querySnapshot.forEach(async (doc) => {
      snapshotData.push(doc.data());
    });

    // let data = await Promise.all(
    //   snapshotData.map(async (content, i) => {
    //     const { contentType, published } = content;

    //     const _fetch =
    //       contentType == "course"
    //         ? await getCourse(published)
    //         : await getDocument(published);

    //     const { id, timestamp, ...rest } = _fetch;

    //     return { ...content, ...rest };
    //   })
    // );

    return snapshotData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const listenOneContent = (_id, callback) => {
  try {
    const docRef = doc(db, "content", _id);

    const unsub = onSnapshot(docRef, (snapshot) => {
      callback?.(snapshot.data());
    });

    return unsub;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const listenUserContent = (cid, callback) => {
  const docsRef = collection(db, "content");

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

export const fetchOneContent = async (_id) => {
  try {
    const contentRef = doc(db, "content", _id);
    const contentSnap = await getDoc(contentRef);

    return contentSnap.data();
  } catch (error) {
    console.log("cid", _id, "No such document!");
    throw error;
  }
};

export const getUserContent = async ({ author }) => {
  try {
    if (!author) return null;

    const docsRef = collection(db, "content");

    const q = query(
      docsRef,
      orderBy("timestamp", "desc"),
      where("author", "==", author)
    );

    const querySnapshot = await getDocs(q);

    const snapshotData = [];
    querySnapshot.forEach(async (doc) => {
      snapshotData.push(doc.data());
    });

    return snapshotData;
  } catch (error) {
    return console.log(error);
  }
};

export const getPendingContent = async () => {
  try {
    const docsRef = collection(db, "content");

    const q = query(docsRef, where("status", "==", "pending"));

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

export const listenPublishedContent = (callback) => {
  try {
    const docsRef = collection(db, "content");

    const q = query(docsRef, where("status", "==", "published"));

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
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const listenPendingContent = (callback) => {
  try {
    const docsRef = collection(db, "content");

    const q = query(docsRef, where("status", "==", "pending"));

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
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const approveRejectContent = async ({ id, approve }) => {
  try {
    const docRef = doc(db, "content", id);

    const status = approve ? "published" : "rejected";

    await updateDoc(docRef, { status });

    return { success: true, id, status };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteContent = async (contentId, published, contentType) => {
  // return console.log(contentId, published, contentType);

  try {
    await deleteDoc(doc(db, "content", contentId));

    if (contentType === "document") {
      await deleteDoc(doc(db, "documents", published));
    } else if (contentType === "assessments") {
      await deleteDoc(doc(db, "assessments", published));
    } else if (contentType === "course") {
      await deleteDoc(doc(db, "courses", published));
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

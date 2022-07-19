import { db } from "@config/firebase";
import {
  collection,
  orderBy,
  query,
  limit,
  getDocs,
  startAfter,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getCourse } from "./course";
import { getDocument } from "./document";

export const getContent = async ({
  sort: _sort = "timestamp",
  order: _order = "asc",
  limit: _limit,
  startAfter: _startAfter,
  author,
  categories,
  difficulty,
  showPrivate,
  hideAssessments,
  contentType,
}) => {
  try {
    const docsRef = collection(db, "content");

    const queryConstraints = [];
    queryConstraints.push(where("status", "==", "published"));
    if (_startAfter) queryConstraints.push(startAfter(_startAfter.timestamp));
    if (_limit) queryConstraints.push(limit(_limit));
    if (author) queryConstraints.push(where("author", "==", author));
    if (contentType)
      queryConstraints.push(where("contentType", "==", contentType));
    if (categories?.length)
      queryConstraints.push(where("category", "in", categories));
    if (difficulty) queryConstraints.push(where("level", "==", difficulty));
    if (!showPrivate) queryConstraints.push(where("private", "==", false));
    if (hideAssessments)
      queryConstraints.push(where("contentType", "!=", "assessment"));

    const q = query(docsRef, orderBy(_sort, _order), ...queryConstraints);

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

export const getUserContent = async ({ author }) => {
  try {
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

    let data = await Promise.all(
      snapshotData.map(async (content, i) => {
        const { contentType, published } = content;

        const _fetch =
          contentType == "course"
            ? await getCourse(published)
            : await getDocument(published);

        const { id, timestamp, ...rest } = _fetch;

        return { ...content, ...rest };
      })
    );

    return data;
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

    let data = await Promise.all(
      snapshotData.map(async (content, i) => {
        const { contentType, published } = content;

        const _fetch =
          contentType == "course"
            ? await getCourse(published)
            : await getDocument(published);

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

import { db } from "@config/firebase";
import {
  collection,
  orderBy,
  query,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { getCourse } from "./course";
import { getDocument } from "./document";

export const getContent = async ({
  sort: _sort,
  order: _order,
  limit: _limit,
  startAfter: _startAfter,
}) => {
  try {
    const docsRef = collection(db, "content");

    console.log("Start After", _startAfter);

    const q = _startAfter
      ? query(
          docsRef,
          orderBy(_sort, _order),
          startAfter(_startAfter.timestamp),
          limit(_limit)
        )
      : query(docsRef, orderBy(_sort, _order), limit(_limit));

    const querySnapshot = await getDocs(q);

    const snapshotData = [];
    querySnapshot.forEach(async (doc) => {
      snapshotData.push(doc.data());
      console.log(doc);
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

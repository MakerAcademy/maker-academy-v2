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
  deleteField,
} from "@firebase/firestore";
import { withAdminDb } from "@hoc/routes";

const Test = () => {
  return (
    <div>
      <button>click here</button>
    </div>
  );
};

export default Test;

export const getServerSideProps = withAdminDb(async (context, { db }) => {
  const contacts = await db
    .collection("content")
    .where("metadata.allDocuments", "array-contains", {
      contentType: "document",
      docId: "7lGq9yhF2YKvaKI70WzU",
      title: "The Stability Of Stablecoins part 1",
    })
    .get()
    .then((snap) => {
      return snap.docs.map((doc) => doc.data());
    });

  console.log(123, contacts);

  return {
    props: {},
  };
});

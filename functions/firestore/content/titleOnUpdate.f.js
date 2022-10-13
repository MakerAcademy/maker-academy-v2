const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

exports = module.exports = functions.firestore
  .document("/content/{contentId}")
  .onUpdate(async (change, context) => {
    try {
      const before = change.before.data();
      const after = change.after.data();
      const contentId = context.params.contentId;

      const contentType = before.contentType;
      const docId = before.published;
      const oldTitle = before.metadata.title;
      const newTitle = after.metadata.title;

      if (oldTitle !== newTitle) {
        const docs = await db
          .collection("content")
          .where("metadata.allDocuments", "array-contains", {
            contentType,
            docId,
            oldTitle,
          })
          .get()
          .then((snap) => {
            let arr = [];
            snap.docs.map((doc) => arr.push(doc.data()));
          });

        //Update all the metadata titles inside course

        //Update all the metadata titles inside content
      }

      return;
    } catch (err) {
      console.log(err);
    }
  });

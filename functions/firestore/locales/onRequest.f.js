import admin from "firebase-admin";
import * as functions from "firebase-functions";

const db = admin.firestore();

export default functions.https.onRequest((req, res) => {
  // let body = JSON.parse(req.body);

  return db
    .collection("locales")
    .get()
    .then((snap) => {
      let arr = [];
      snap.docs.map((doc) => arr.push(doc.data()));

      res.send(arr);
    })
    .catch((err) => {
      res.send(err);
    });
});

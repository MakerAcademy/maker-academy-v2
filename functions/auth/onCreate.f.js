import * as functions from "firebase-functions";
import admin from "firebase-admin";
import moment from "moment";

const db = admin.firestore();

export default functions.auth.user().onCreate(async (userRecord) => {
  const {
    email,
    uid,
    displayImage,
    creationTime: created = moment().format(),
  } = userRecord || {};
  const creationTime = moment(created);
  const year = creationTime.format("YYYY");
  const month = creationTime.format("MM");
  const day = creationTime.format("DD");

  const user = await admin.auth().getUser(uid);
  const { providerData = [], displayName = "" } = user;

  // Set the provider
  const { providerId: id } = providerData[0] || {
    providerId: email ? "email_password" : "phone",
  };
  const providerId = id.replace(".com", "");

  //Increment Provider - email/google/twitter ...
  const providerTransaction = await db.runTransaction(async (t) => {
    if (providerId) {
      const ref = db.doc(`provider_count/${providerId}`);
      const doc = await t.get(ref);

      if (doc.exists) {
        const _count = doc.data().count || 0;
        t.update(ref, { count: _count + 1 });
      } else {
        t.set(ref, { count: 1 });
      }
    }
  });

  // ---------- Set analytics ----------
  // Day
  const dayTransaction = await db.runTransaction(async (t) => {
    if (year && month && day) {
      const ref = db.doc(`/user_registrations_per_day/${year}-${month}-${day}`);
      const doc = await t.get(ref);

      if (doc.exists) {
        const _count = doc.data().count || 0;
        t.update(ref, { count: _count + 1 });
      } else {
        t.set(ref, { count: 1 });
      }
    }
  });

  // Month
  const monthTransaction = await db.runTransaction(async (t) => {
    if (year && month) {
      const ref = db.doc(`/user_registrations_per_month/${year}-${month}`);
      const doc = await t.get(ref);

      if (doc.exists) {
        const _count = doc.data().count || 0;
        t.update(ref, { count: _count + 1 });
      } else {
        t.set(ref, { count: 1 });
      }
    }
  });

  // User
  const userTransaction = await db.runTransaction(async (t) => {
    const ref = db.doc("users_count/counter");
    const doc = await t.get(ref);

    // User counter
    if (doc.exists) {
      const _count = doc.data().count || 0;
      t.update(ref, { count: _count + 1 });
    } else {
      t.set(ref, { count: 1 });
    }
  });
  // ---------- Set analytics ----------

  const contactRef = await db.collection("contacts").doc();

  // ---------- User Profile ----------
  const userRef = await db.doc(`users/${uid}`).set({
    uid,
    email,
    created,
    displayName,
    trustLevel: 1,
    providerId,
    cid: contactRef.id,
  });
  // ---------- User Profile ----------

  // ---------- Contact Profile ----------
  const username = email.split("@")[0];

  const emailFirstHalf = username.substr(0, username.length / 2);
  const emailSecondHalf = username.substr(username.length / 2);

  const firstName =
    displayName.substr(0, displayName.indexOf(" ")) || emailFirstHalf;
  const lastName =
    displayName.substr(displayName.indexOf(" ") + 1) || emailSecondHalf;

  let _searchTerm = `${firstName} ${lastName} ${email}`
    .toLowerCase()
    .split(" ");

  await contactRef.set({
    uid,
    email,
    created,
    firstName,
    lastName,
    level: 1,
    profilePicture: displayImage,
    role: "student",
    id: contactRef.id,
    filters: { searchTerm: _searchTerm },
  });
  // ---------- Contact Profile ----------

  return;
});

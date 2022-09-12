const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports = module.exports = functions.firestore
  .document("/users/{uid}")
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();
    const uid = after.uid;

    if (before.disabled !== after.disabled) {
      await admin.auth().updateUser(uid, {
        disabled: !!after.disabled,
      });
    }

    return null;
  });

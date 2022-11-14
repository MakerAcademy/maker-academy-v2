const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

exports = module.exports = functions.https.onCall(
  async (data = {}, context) => {
    const address = data.address;

    if (context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "User is already authenticated"
      );
    }

    if (!address) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "No wallet address provided"
      );
    }

    const uid = await admin
      .auth()
      .getUserByEmail(`${address}@academy.makerdao.network`)
      .then((userRecord) => {
        console.log("UID", userRecord.uid);
        if (userRecord) {
          return userRecord.uid;
        }
      })
      .catch(function (error) {
        console.log("Error fetching user data:", error);
      });

    if (!uid) {
      throw new functions.https.HttpsError("failed-user", "Wallet not found");
    }

    return await admin
      .auth()
      .createCustomToken(uid)
      .then((customToken) => {
        console.log(`The customToken is: ${customToken}`);
        return { success: true, customToken: customToken };
      })
      .catch((error) => {
        console.error(`Something happened buddy: ${error}`);
        return { error: true };
      });
  }
);

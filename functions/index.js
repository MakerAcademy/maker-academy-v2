const loadFunctions = require("firebase-function-tools");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const config = functions.config().firebase;
const serviceAccount = require("./serviceAccountKey.json");

try {
  if (!admin.apps?.length) {
    admin.initializeApp({
      ...config,
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (e) {
  console.log(e);
}

loadFunctions(__dirname, exports, true);

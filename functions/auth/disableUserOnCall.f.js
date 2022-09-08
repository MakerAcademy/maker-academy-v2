// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const fetch = require("node-fetch");
// const moment = require("moment-timezone");

// if (admin.apps.length === 0) {
//   admin.initializeApp();
// }

// exports = module.exports = functions.https.onCall(
//   async (data = {}, context) => {
//     try {
//       if (!context.auth) {
//         throw new functions.https.HttpsError(
//           "failed-precondition",
//           "The function must be called " + "while authenticated."
//         );
//       }

//       if (!data.uid) {
//         throw new functions.https.HttpsError(
//           "failed-precondition",
//           "UID missing"
//         );
//       }

//       await admin.auth().updateUser(data.uid, {
//         disabled: true,
//       });

//       return { success: true };
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   }
// );

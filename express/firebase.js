
const firebase = require("firebase-admin");
const serviceAccount = require("./test-e3771-firebase-adminsdk-6twaf-141333bec0.json");

module.exports = () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
  console.info("Initialized Firebase SDK");
};
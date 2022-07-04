import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB6ff6ho4JdcYUWUDPApwq1Zt27RBV5d0k",
  authDomain: "my-app-421af.firebaseapp.com",
  databaseURL: "https://my-app-421af-default-rtdb.firebaseio.com",
  projectId: "my-app-421af",
  storageBucket: "my-app-421af.appspot.com",
  messagingSenderId: "311999094760",
  appId: "1:311999094760:web:93e30541271ec54425ce5d",
  measurementId: "G-0R8C0SDGHW",
});

const storage = getStorage();
export const database = getFirestore(app);
export const auth = app.auth();
export default app;

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB65z76k9wo9AxEdj8zmQpfyObrwc9PiM4",
  databaseURL: "https://sharend-chat-app-default-rtdb.firebaseio.com/",
  authDomain: "sharend-chat-app.firebaseapp.com",
  projectId: "sharend-chat-app",
  storageBucket: "sharend-chat-app.appspot.com",
  messagingSenderId: "1093164383866",
  appId: "1:1093164383866:web:953d073f04e8c3fc7505c3",
  measurementId: "G-B88XV7ZYV6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const persist = firebase.auth.Auth.Persistence.SESSION;
const provider = new firebase.auth.GoogleAuthProvider();
const providerPublic = provider.addScope(
  "https://www.googleapis.com/auth/userinfo.profile"
);

export { auth, providerPublic, persist, firebaseApp };
export default db;

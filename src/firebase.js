import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBHfgRXVUz4vbm9c_Vfk5wLSRqiX2r6j8o",
  authDomain: "chatnip-df463.firebaseapp.com",
  projectId: "chatnip-df463",
  storageBucket: "chatnip-df463.appspot.com",
  messagingSenderId: "231364111878",
  appId: "1:231364111878:web:d3e7d8914e091fdff61d87",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();

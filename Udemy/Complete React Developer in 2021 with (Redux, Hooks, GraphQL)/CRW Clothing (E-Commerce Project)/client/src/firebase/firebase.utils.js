import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyBouwFmU4J_2bMciZ8wenpvrkf_iW8o6po",
	authDomain: "crw-clothing--db.firebaseapp.com",
	projectId: "crw-clothing--db",
	storageBucket: "crw-clothing--db.appspot.com",
	messagingSenderId: "540712363159",
	appId: "1:540712363159:web:73e83bf0136960ccaaf5d2",
	measurementId: "G-YN9HGFGP69",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

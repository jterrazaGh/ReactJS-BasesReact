//function for create.documents
//import firebase from "firebase/app";
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"; // functions
import "firebase/compat/auth"; // authentication

// config
const config = {
    apiKey: "AIzaSyAdr4lVTwOb4CpKEqwdJHYq7JiYBD_AmIc",
    authDomain: "bases-react-81d82.firebaseapp.com",
    projectId: "bases-react-81d82",
    storageBucket: "bases-react-81d82.appspot.com",
    messagingSenderId: "954868634202",
    appId: "1:954868634202:web:0b5ffbbd46e1654fcefe63"
  };

// create my web app with firebase
firebase.initializeApp(config);

// function for create-documents
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uuid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

// exports
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// providers
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
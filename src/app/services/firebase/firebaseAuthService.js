import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import firebaseConfig from "./firebaseConfig";

class FirebaseAuthService {
  auth;
  firestore;
  googleProvider;
  facebookProvider;
  twitterProvider;

  init = () => {
    firebase.initializeApp(firebaseConfig);
  };

  checkAuthStatus = callback => {
    this.auth.onAuthStateChanged(callback);
  };

  signUpWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  signInWithPopup = media => {
    switch (media) {
      case "google":
        return this.auth.signInWithPopup(this.googleProvider);

      case "facebook":
        return this.auth.signInWithPopup(this.facebookProvider);

      case "twitter":
        return this.auth.signInWithPopup(this.twitterProvider);

      default:
        break;
    }
  };

  signInWithPhoneNumber = phoneNumber => {
    return this.auth.signInWithPhoneNumber(phoneNumber);
  };

  getUserData = docId => {
    this.firestore
      .collection("users")
      .doc(docId)
      .get()
      .then(doc => {
        console.log(doc.data());
      });
  };

  getAllUser = () => {
    this.firestore
      .collection("users")
      .get()
      .then(docList => {
        docList.forEach(doc => {
          console.log(doc.data());
        });
      });
  };

  signOut = () => {
    return this.auth.signOut();
  };
}

const instance = new FirebaseAuthService();

export default instance;

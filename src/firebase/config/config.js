import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCDIdZCaycypbZDKUZnvUpy_FkUMGrmU8o",
    authDomain: "kontrol-panel-a6251.firebaseapp.com",
    projectId: "kontrol-panel-a6251",
    storageBucket: "kontrol-panel-a6251.appspot.com",
    messagingSenderId: "88684263688",
    appId: "1:88684263688:web:95d8493d9fbca9bdce54bd"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const portfolioAdminAuth = firebase.auth();
const portfolioStorage = firebase.storage();
const portfolioFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { portfolioAdminAuth, portfolioFirestore, portfolioStorage, timestamp };
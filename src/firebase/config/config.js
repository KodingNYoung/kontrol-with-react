import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAd4qHx0KBWaF_HhTwu4p2rItWKuiPn0DM",
  authDomain: "portfolio-5cc31.firebaseapp.com",
  databaseURL: "https://portfolio-5cc31.firebaseio.com",
  projectId: "portfolio-5cc31",
  storageBucket: "portfolio-5cc31.appspot.com",
  messagingSenderId: "416876812139",
  appId: "1:416876812139:web:2e82b50691d15001105e2e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const portfolioAdminAuth = firebase.auth();
const portfolioStorage = firebase.storage();
const portfolioFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { portfolioAdminAuth, portfolioFirestore, portfolioStorage, timestamp };
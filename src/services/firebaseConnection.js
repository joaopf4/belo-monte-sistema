import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyCufI8LHLwg7ijqly6fBunpv52zCRkimoY",
    authDomain: "sistema-belo-monte.firebaseapp.com",
    projectId: "sistema-belo-monte",
    storageBucket: "sistema-belo-monte.appspot.com",
    messagingSenderId: "614923933582",
    appId: "1:614923933582:web:cc06fe395b6d0d773ef6df",
    measurementId: "G-TQEQT75J4R"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;
  
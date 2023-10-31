// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdPXUZcZJQse7DhbG_mr_FLaEuiWeifl4",
  authDomain: "coconut-6968e.firebaseapp.com",
  projectId: "coconut-6968e",
  storageBucket: "coconut-6968e.appspot.com",
  messagingSenderId: "303343819784",
  appId: "1:303343819784:web:acca5af06e1b8e8bf745bd"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
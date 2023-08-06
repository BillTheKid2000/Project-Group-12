// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBOu2NukPMhGXr46EO7aY8R-IIbReW31c",
  authDomain: "memoria-web-51384.firebaseapp.com",
  projectId: "memoria-web-51384",
  storageBucket: "memoria-web-51384.appspot.com",
  messagingSenderId: "887978552785",
  appId: "1:887978552785:web:bb074f05fef446a45544f0",
  measurementId: "G-S7EL6RSHGE"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Get the auth instance
const auth = getAuth();

// Create a Google provider object
const provider = new GoogleAuthProvider();

function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password).then(cred => {
    console.log(cred.user);
    alert(cred.user.email + ' has been registered');
    closeModal('signupModal');
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
  });
}

function login(email, password) {
  signInWithEmailAndPassword(auth, email, password).then(cred => {
    alert(cred.user.email + ' has logged in');
    console.log(cred.user);
    closeModal('signinModal');
    document.getElementById('signin-email').value = '';
    document.getElementById('signin-password').value = '';
  });
}

// Sign in with Google
function signInWithGoogle() {
  signInWithPopup(auth, provider).then((result) => {
    alert(result.user.displayName + ' has logged in with Google');
    console.log(result.user);
  }).catch((error) => {
    alert('Error logging in with Google: ' + error.message);
    console.log(error);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;
    signUp(email, password);
  });

  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('signin-email').value;
    var password = document.getElementById('signin-password').value;
    login(email, password);
  });

  // Adding event listener for the Google login button
  document.getElementById('google-login-button').addEventListener('click', signInWithGoogle);
});

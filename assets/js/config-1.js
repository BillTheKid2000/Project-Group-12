// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBOu2NukPMhGXr46EO7aY8R-IIbReW31c",
  authDomain: "memoria-web-51384.firebaseapp.com",
  projectId: "memoria-web-51384",
  storageBucket: "memoria-web-51384.appspot.com",
  messagingSenderId: "887978552785",
  appId: "1:887978552785:web:bb074f05fef446a45544f0",
  measurementId: "G-S7EL6RSHGE"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const analytics = firebase.analytics();

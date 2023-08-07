function signUp (email, password) {
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
      alert(cred.user.email + ' has been registered');
    // Close the signup modal
      closeModal('signupModal');
    // Clear the input fields
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    });
  }
  
  function login(email, password) {
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        alert(cred.user.email + ' has logged in');
        console.log(cred.user);
    // Close the signin modal
      closeModal('signinModal');
    // Clear the input fields
    document.getElementById('signin-email').value = '';
    document.getElementById('signin-password').value = '';
    });
  }
  
  // Adding event listener for sign-up form submission
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;
    signUp(email, password);
  });
  
  // Adding event listener for login form submission
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('signin-email').value;
    var password = document.getElementById('signin-password').value;
    login(email, password);
  });
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("User is signed in with email:", user.email);
      
    } else {
      console.log("User is signed out.");
      
    }
  });

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
   
  })
  .catch((error) => {
    // Handle errors here.
    console.log(error.message);
  });


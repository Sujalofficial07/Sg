// ✅ Paste your Firebase config here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpZxMl8oqttPIuEg5wjITJTJ8-swtF0xc",
  authDomain: "sg-website-a3bf4.firebaseapp.com",
  projectId: "sg-website-a3bf4",
  storageBucket: "sg-website-a3bf4.firebasestorage.app",
  messagingSenderId: "620775585240",
  appId: "1:620775585240:web:d98c3f97a92d1ea4cf6ead",
  measurementId: "G-DGCMH09V7T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      alert("✅ Logged in as " + user.user.email);
      window.location.href = "index.html"; // redirect after login
    })
    .catch(err => alert(err.message));
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      alert("🎉 Account created: " + user.user.email);
      toggleForm();
    })
    .catch(err => alert(err.message));
}

function toggleForm() {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const formTitle = document.getElementById("formTitle");
  const toggleText = document.getElementById("toggleText");

  if (signupBtn.classList.contains("hidden")) {
    signupBtn.classList.remove("hidden");
    loginBtn.classList.add("hidden");
    formTitle.textContent = "Sign Up";
    toggleText.innerHTML = 'Already have an account? <a href="#" onclick="toggleForm()">Login</a>';
  } else {
    loginBtn.classList.remove("hidden");
    signupBtn.classList.add("hidden");
    formTitle.textContent = "Login";
    toggleText.innerHTML = 'Don’t have an account? <a href="#" onclick="toggleForm()">Sign up</a>';
  }
}

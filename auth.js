// ✅ Paste your Firebase config here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
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
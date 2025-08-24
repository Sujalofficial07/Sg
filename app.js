// ===== Firebase config =====
const firebaseConfig = {
  apiKey: "AIzaSyCpZxMl8oqttPIuEg5wjITJTJ8-swtF0xc",
  authDomain: "sg-website-a3bf4.firebaseapp.com",
  projectId: "sg-website-a3bf4",
  storageBucket: "sg-website-a3bf4.firebasestorage.app",
  messagingSenderId: "620775585240",
  appId: "1:620775585240:web:d98c3f97a92d1ea4cf6ead",
  measurementId: "G-DGCMH09V7T"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ===== UI helpers =====
const statusEl = document.getElementById('status');
const emailEl = document.getElementById('email');
const passEl = document.getElementById('password');
let mode = 'login'; // or 'signup'

function setStatus(msg, isError=true){
  if(statusEl) {
    statusEl.textContent = msg || '';
    statusEl.style.color = isError ? '#ffd1d1' : '#c6ffd1';
  }
}

function toggleMode(){
  mode = mode === 'login' ? 'signup' : 'login';
  document.querySelector('.title').textContent = mode === 'login' ? 'Welcome back' : 'Create your account';
  document.querySelector('.subtitle').textContent = mode === 'login' ? 'Sign in to continue' : 'Sign up to get started';
  document.querySelector('#toggleBtn').textContent = mode === 'login' ? 'Create account' : 'I already have an account';
  setStatus('');
}

async function login(){
  setStatus('');
  const email = emailEl.value.trim();
  const pass = passEl.value;
  if(!email || !pass) return setStatus('Enter email and password');
  try{
    if(mode === 'login'){
      await auth.signInWithEmailAndPassword(email, pass);
      setStatus('Logged in ✓', false);
      window.location.href = 'home.html';
    }else{
      await auth.createUserWithEmailAndPassword(email, pass);
      setStatus('Account created ✓', false);
      mode = 'login';
      toggleMode();
    }
  }catch(err){
    setStatus(err.message);
  }
}

async function resetPassword(){
  const email = emailEl.value.trim();
  if(!email) return setStatus('Enter your email first');
  try{
    await auth.sendPasswordResetEmail(email);
    setStatus('Password reset email sent ✓', false);
  }catch(err){
    setStatus(err.message);
  }
}

async function googleSignIn(){
  setStatus('');
  const provider = new firebase.auth.GoogleAuthProvider();
  try{
    if (window.innerWidth > 600) {
      await auth.signInWithPopup(provider);
    } else {
      await auth.signInWithRedirect(provider);
    }
    setStatus('Logged in with Google ✓', false);
    window.location.href = 'home.html';
  }catch(err){
    if (err.code && err.code.includes('popup')) {
      try{ await auth.signInWithRedirect(provider); }
      catch(e){ setStatus(e.message); }
    } else {
      setStatus(err.message);
    }
  }
}

// Keep user signed in
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

auth.onAuthStateChanged(user => {
  if(user && window.location.pathname.includes('home.html')){
    document.getElementById('userEmail').textContent = user.email;
  }
});

function logout(){
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}

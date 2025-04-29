import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export default defineNuxtPlugin((nuxtApp) => {

  const firebaseConfig = {
    apiKey: "AIzaSyCzby2WcRfYSMD-gJ3zH7TAP_axCm12s5Q",
    authDomain: "nuxt-ionic-test.firebaseapp.com",
    projectId: "nuxt-ionic-test",
    storageBucket: "nuxt-ionic-test.firebasestorage.app",
    messagingSenderId: "599993243420",
    appId: "1:599993243420:web:923dae4fab0ba98be5ccd9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore and Auth
  const db = getFirestore(app);
  const auth = getAuth(app);

  // Provide Firebase services globally to Nuxt
  nuxtApp.provide('firebaseApp', app);
  nuxtApp.provide('db', db);
  nuxtApp.provide('auth', auth);
  nuxtApp.provide('createUserWithEmailAndPassword', createUserWithEmailAndPassword);
  nuxtApp.provide('signInWithEmailAndPassword', signInWithEmailAndPassword);
  nuxtApp.provide('signOut', signOut);
  nuxtApp.provide('onAuthStateChanged', onAuthStateChanged);

  // Initialize the auth state listener on app load
  const authStore = useAuthStore();
  authStore.initializeAuthStateListener();
});

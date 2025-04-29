import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export default defineNuxtPlugin((nuxtApp) => {

  const firebaseConfig = {
      apiKey: process.env.NUXT_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID
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

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    error: null, // Added error state for better handling
  }),

  actions: {
    // Initialize the authentication state listener
    initializeAuthStateListener() {
      const { $auth } = useNuxtApp();
      onAuthStateChanged($auth, (user) => {
        if (user) {
          this.user = user;
          this.isAuthenticated = true;
          this.error = null; // Clear any errors on successful login
        } else {
          this.user = null;
          this.isAuthenticated = false;
        }
      });
    },

    // Signup with email and password
    async signup(email, password) {
      const {  $auth,$createUserWithEmailAndPassword } = useNuxtApp();
      try {
        const userCredential = await $createUserWithEmailAndPassword($auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        this.error = null; // Clear error on success
      } catch (error) {
        console.error('Signup error:', error.message);
        this.error = error.message; // Set error message in state
      }
    },

    // Login with email and password
    async login(email, password) {
      const { $auth, $signInWithEmailAndPassword } = useNuxtApp();
    
      console.log('Email:', email);  // Log email to check if it's a string
      console.log('Password:', password);  // Log password
    
      try {
        const userCredential = await $signInWithEmailAndPassword($auth, email, password);
        this.user = userCredential.user;
        this.isAuthenticated = true;
        this.error = null; // Clear error on success
      } catch (error) {
        console.error('Login error:', error.message);
        this.error = error.message; // Set error message in state
      }
    },
    

    // Logout user
    async logout() {
      const { $signOut, $auth } = useNuxtApp();
      try {
        await $signOut($auth);
        this.user = null;
        this.isAuthenticated = false;
        this.error = null; // Clear error on logout
      } catch (error) {
        console.error('Logout error:', error.message);
        this.error = error.message; // Set error message in state
      }
    },
  },
});

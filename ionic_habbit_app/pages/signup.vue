<template>
  <BaseLayout page-title="Signup" page-default-back-link="/memories">
    <template #title>Sign Up</template>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input v-model="email" type="email" required></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input v-model="password" type="password" required></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Confirm Password</ion-label>
        <ion-input v-model="confirmPassword" type="password" required></ion-input>
      </ion-item>

      <ion-button expand="full" @click="signup">Signup</ion-button>

      <ion-button expand="full" color="light" @click="goToLogin">
        Already have an account? Login
      </ion-button>
    </ion-content>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import BaseLayout from '../componets/BaseLayout.vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()
const authStore = useAuthStore()

const showAlert = (message) => {
  alert(message)
}

const signup = () => {
  if (password.value !== confirmPassword.value) {
    showAlert("Passwords don't match!")
    return
  }

  if (!email.value || !password.value || !confirmPassword.value) {
    showAlert('Please fill in all fields!')
    return
  }

  // Call authStore.signup to handle the signup
  authStore.signup(email.value, password.value)
    .then(() => {
      router.push('/')   
    })
    .catch((error) => {
      // Handle possible errors from the authStore.signup (e.g., email already taken)
      showAlert(error.message || 'Something went wrong. Please try again.')
    })
}

const goToLogin = () => {
  router.push('/') // Navigate to login page
}
</script>

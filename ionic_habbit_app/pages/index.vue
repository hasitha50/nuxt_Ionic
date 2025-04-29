<template>
  <BaseLayout>
    <template #title>Login</template>

    <ion-content>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input v-model="email" type="email" required></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input v-model="password" type="password" required></ion-input>
      </ion-item>

      <ion-button expand="full" @click="login">Login</ion-button>

      <ion-button expand="full" color="light" @click="goToSignup">
        Don't have an account? Signup
      </ion-button>
    </ion-content>

    <!-- Add IonAlert for error handling -->
    <ion-alert :is-open="alertIsOpen" :message="alertMessage" :buttons="alertButtons"
      @did-dismiss="alertIsOpen = false"></ion-alert>
  </BaseLayout>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import BaseLayout from '../componets/BaseLayout.vue'

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

// Alert state
const alertIsOpen = ref(false)
const alertMessage = ref('')
const alertButtons = ref([
  { text: 'OK', role: 'cancel' }
])

// Check if the user is already logged in
watchEffect(() => {
  if (authStore.isAuthenticated) {
    router.push('/home') // Redirect to home page if already logged in
  }
})

// Handle login functionality
const login  = async() => {
  const userData = { email: email.value, password: password.value }
  if (userData.email === '' || userData.password === '') {
    // Show error alert if any field is empty
    showAlert('Both email and password are required.')
  } else {

  
  await authStore.login(email.value,password.value)
    if (authStore.isAuthenticated) {
      router.push('/home') // Redirect to home page on successful login
    } else {
      // Show error alert if authentication fails
      showAlert('Invalid email or password.')
    }
  }
}

// Show alert function
const showAlert = (message) => {
  alertMessage.value = message
  alertIsOpen.value = true
}

// Redirect to signup page
const goToSignup = () => {
  router.push('/signup') // Navigate to signup page
}
</script>

<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar color="primary">
          <ion-title class="ion-text-center">Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="ion-padding login-background">
        <div class="login-container">
          <h1>🔐 Sign In</h1>
  
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email" type="email" />
          </ion-item>
  
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="password" type="password" />
          </ion-item>
  
          <ion-button expand="block" class="ion-margin-top" @click="handleLogin">
            🚀 Login
          </ion-button>
  
          <ion-button fill="clear" size="small" @click="goHome">
            🔙 Back to Home
          </ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const router = useRouter()
  
  const email = ref('')
  const password = ref('')
  
  const handleLogin = () => {
    if (email.value && password.value) {
      console.log('Logging in with:', email.value)
      // Add actual auth logic here
      router.push('/')
    } else {
      alert('Please enter both email and password.')
    }
  }
  
  const goHome = () => router.push('/')
  </script>
  
  <style scoped>
  .login-background {
    --background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 24px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  h1 {
    margin-bottom: 16px;
    font-size: 2rem;
    color: #333;
  }
  </style>
  
<template>
    <ion-page>
      <ion-header translucent>
        <ion-toolbar color="primary">
          <ion-title class="ion-text-center">About</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="ion-padding about-background">
        <div class="about-container">
          <h1>📱 About This App</h1>
          <p class="description">
            This app is built using <strong>Nuxt 3</strong> and <strong>Ionic Vue</strong> to deliver a fast, responsive, and mobile-friendly experience.
          </p>
          <ion-list inset>
            <ion-item>
              <ion-label>✨ Framework: Nuxt 3</ion-label>
            </ion-item>
           
          </ion-list>
          <ion-button expand="block" class="ion-margin-top" @click="goHome">
            🔙 Back to Home
          </ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  const router = useRouter()
  
  const goHome = () => router.push('/')
  </script>
  
  <style scoped>
  .about-background {
    --background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .about-container {
    max-width: 420px;
    margin: auto;
    padding: 24px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
  
  h1 {
    margin-bottom: 10px;
    font-size: 2rem;
    color: #333;
  }
  
  .description {
    margin-bottom: 20px;
    font-size: 1rem;
    color: #444;
  }
  </style>
  
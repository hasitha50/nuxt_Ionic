<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar color="primary">
        <ion-title class="ion-text-center">Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding home-background">
      <div class="home-container">
        <h1>👋 Welcome Home</h1>
        <p class="description">Explore the app using the buttons below:</p>

        <ion-button expand="block" size="large" color="secondary" @click="goToAbout">
          📄 About Page
        </ion-button>

        <ion-button expand="block" size="large" color="tertiary" @click="goToLogin">
          🔐 Login Page
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
const router = useRouter()

const goToAbout = () => router.push('/about')
const goToLogin = () => router.push('/login')
</script>

<style scoped>
.home-background {
  --background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.home-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
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
  color: #555;
}
</style>

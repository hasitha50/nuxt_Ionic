<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="'/'" />

        </ion-buttons>

        <ion-title>
          <slot name="title">Untitled</slot>
        </ion-title>

        <ion-buttons slot="end">
          <ion-button @click="logout" color="white">Logout</ion-button>
          <slot name="actions-end" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <slot />
    </ion-content>

    <div class="date-time-top">
      {{ currentDateTime }}
    </div>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth' // assuming you're using a store for authentication

const props = defineProps({
  pageDefaultBackLink: {
    type: String,
    default: '/',
  },
})

// Function to format current date and time
const getCurrentDateTime = () => {
  const now = new Date()
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  return now.toLocaleDateString('en-US', options) + ' ' + now.toLocaleTimeString('en-US')
}

// Create a reactive variable for current date and time
const currentDateTime = computed(() => getCurrentDateTime())

// Logout functionality
const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout() // Assuming you have a logout function in your auth store to handle user session termination
  router.push('/') // Redirect to the login page after logout
}
</script>

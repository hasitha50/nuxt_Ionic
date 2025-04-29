<template>
  <ion-page>
    <ion-content>
      <form @submit.prevent="onSubmit">
        <ion-list>
          <ion-item>
            <ion-label position="floating">Title</ion-label>
            <ion-input v-model="title" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Description</ion-label>
            <ion-textarea v-model="description" required></ion-textarea>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Image URL</ion-label>
            <ion-input   v-model="imageUrl" required></ion-input>
          </ion-item>
        </ion-list>

        <!-- Image Preview Section -->
        <div v-if="imageUrl" class="ion-text-center ion-padding">
          <ion-img :src="imageUrl" style="max-width: 300px; max-height: 300px; margin: auto;" />
        </div>

        <ion-button type="submit" expand="full" class="ion-margin-top">
          {{ isEditMode ? 'Update' : 'Save' }}
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonImg
} from '@ionic/vue'

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMemoriesStore } from '../../stores/memories'

const title = ref('')
const description = ref('')
const imageUrl = ref('')
const isEditMode = ref(false)
const router = useRouter()
const route = useRoute()
const memoriesStore = useMemoriesStore()

const memoryId = route.params.id

onMounted(() => {
  if (memoryId) {
    isEditMode.value = true
    const memory = memoriesStore.memories.find(memory => memory.id === memoryId)
    console.log(memory)
    if (memory) {
      title.value = memory.title
      description.value = memory.description
      imageUrl.value = memory.imageUrl
    }
  }
})

const onSubmit = () => {
  const memoryData = {
    title: title.value,
    description: description.value,
    imageUrl: imageUrl.value
  }

  if (isEditMode.value) {
    memoriesStore.updateMemory(memoryId, memoryData)
  } else {
    memoriesStore.addMemory(memoryData)
  }

  router.push('/home')
}
</script>

<style scoped>
/* Optional: adjust preview responsiveness */
img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>

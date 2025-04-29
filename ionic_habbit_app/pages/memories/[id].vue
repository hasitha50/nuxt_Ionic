<template>
    <BaseLayout>
      <template #title>Memory Details - {{ memoryDetails?.title }}</template>
  
      <template #actions-end>
 
      </template>
  
      <ion-content class="memory-details-content">
        <ion-img :src="memoryDetails?.image" :alt="title" class="memory-image"></ion-img>
        <div class="memory-info">
          <p class="memory-description">{{ memoryDetails?.description }}</p>
       
        </div>
      </ion-content>
    </BaseLayout>
  </template>
  
  
  <script setup>

  import BaseLayout from '../../componets/BaseLayout.vue'
  import { useRoute, useRouter } from 'vue-router'
  
  import { useMemoriesStore } from '../../stores/memories'
  
  const route = useRoute()
  const router = useRouter()
  
  const memoryId = route.params.id
  const memoriesStore = useMemoriesStore()
  
  // Fetch the memory details based on memoryId (you could also use an API here)
  const memoryDetails = computed(() => memoriesStore.memories.find(memory => memory.id === memoryId))
  

  </script>
  
<template>
  <ion-page class="margin_add">
    <ion-content class="ion-padding">
      <ion-list>
        <ion-card v-for="memory in memories" :key="memory.id" class="memory-card">
          <ion-card-header>
            <ion-item lines="none" @click="goToDetail(memory.id)" button>
              <ion-avatar slot="start">
                <ion-img :src="memory.image" />
              </ion-avatar>
              <ion-label>
                <h2>{{ memory.title }}</h2>
                <p>{{ memory.description }}</p>
              </ion-label>
            </ion-item>
          </ion-card-header>
          <ion-card-content class="ion-text-end">
            <ion-button size="small" color="primary" @click.stop="editMemory(memory.id)">
              Edit
            </ion-button>
            <ion-button size="small" color="danger" @click.stop="confirmDelete(memory.id)">
              Delete
            </ion-button>
          </ion-card-content>
        </ion-card>
      </ion-list>
    </ion-content>
  </ion-page>
</template>


<script setup>
import {
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
} from '@ionic/vue'

import { navigateTo } from '#app' // Import navigateTo for Nuxt

const props = defineProps({
  memories: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['delete']) // emit delete event to parent
const searchQuery = ref('')

const goToDetail = (id) => {
  navigateTo(`/memories/${id}`)
}

const editMemory = (id) => {
  navigateTo(`/memories/edit/${id}`)
}

const confirmDelete = async (id) => {
  if (confirm('Are you sure you want to delete this memory?')) {
    emit('delete', id) // Let parent handle the actual delete logic
  }
}
  
  // Computed property to filter memories based on search query
  const filteredMemories = computed(() => {
    if (!searchQuery.value) return memories.value
    return memories.value.filter((memory) =>
      memory.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
</script>

<style scoped>
.margin_add{
  margin-top: 60px;
}
</style>

<template>
  <BaseLayout>
    <template #title>All Memories</template>

    <!-- Search & Add Memory Section -->
    <ion-toolbar class="search-toolbar">
      <div class="search-actions">


        <ion-searchbar
          v-model="searchQuery"
          placeholder="Search memories..."
          debounce="300"
          @ionInput="onSearch"
          class="custom-searchbar"
        />
        <ion-button fill="solid" size="small" color="primary" @click="goToAddMemory">
          <ion-icon slot="start" :icon="add" />
          Add Memory
        </ion-button>
      </div>
    </ion-toolbar>

    <!-- Memories List -->
    <MemoriesList :memories="filteredMemories" />
  </BaseLayout>
</template>

<script setup>
import { IonButton, IonIcon, IonToolbar, IonSearchbar } from '@ionic/vue'
import { add } from 'ionicons/icons'
import BaseLayout from '../componets/BaseLayout.vue'
import MemoriesList from '../componets/memories/MemoriesList.vue'

import { useMemoriesStore } from '../stores/memories'
import { computed, ref, onMounted } from 'vue'
import { navigateTo } from '#app'

const memoriesStore = useMemoriesStore()

const searchQuery = ref('')

const memories = computed(() => memoriesStore.memories)

const filteredMemories = computed(() => {
  if (!searchQuery.value.trim()) {
    return memories.value
  }
  const query = searchQuery.value.toLowerCase()
  return memories.value.filter(memory =>
    memory.title.toLowerCase().includes(query) ||
    memory.description.toLowerCase().includes(query)
  )
})

const goToAddMemory = () => {
  navigateTo('/memories/add')
}

const onSearch = () => {
  // Optional: react to search if needed
}

onMounted(() => {
  memoriesStore.fetchMemories()
})
</script>

<style scoped>
.search-toolbar {
  --background: transparent;
  --padding-start: 0;
  --padding-end: 0;
  padding: 1rem 0;
}

.search-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 8px;
}

ion-button {
  --border-radius: 8px;
  --padding-start: 12px;
  --padding-end: 12px;
}

.custom-searchbar {
  flex: 1;
  --background: #f7f7f7;
  --border-radius: 8px;
}
</style>

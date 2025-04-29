import { defineStore } from 'pinia'

import { collection, addDoc ,getDoc,getDocs,updateDoc,doc  } from 'firebase/firestore'

export const useMemoriesStore = defineStore('memories', {
  state: () => ({
    memories: [],
  }),

  actions: {
    async addMemory(memoryData) {
      const newMemory = {
        title: memoryData.title,
        image: memoryData.imageUrl,
        description: memoryData.description,
        createdAt: new Date(),
      }

      try {
        const { $db } = useNuxtApp()
        const docRef = await addDoc(collection($db, 'memories'), newMemory)

        this.memories.unshift({
          id: docRef.id, // Firestore doc ID
          ...newMemory,
        })
      } catch (error) {
        console.error('Error adding memory:', error)
      }
    },
    async updateMemory(memoryId, memoryData) {
      const memory = this.memories.find(m => m.id === memoryId)
      if (!memory) {
        console.error('Memory not found!')
        return
      }

      const updatedMemory = {
        ...memory,
        title: memoryData.title,
        description: memoryData.description,
        image: memoryData.imageUrl,
      }

      try {
        const { $db } = useNuxtApp()
        const memoryRef = doc($db, 'memories', memoryId)
        await updateDoc(memoryRef, updatedMemory)

        // Update the local state
        const index = this.memories.findIndex(m => m.id === memoryId)
        if (index !== -1) {
          this.memories[index] = { id: memoryId, ...updatedMemory }
        }
      } catch (error) {
        console.error('Error updating memory:', error)
      }
    },
    async fetchMemories() {
      try {
        const { $db } = useNuxtApp()
        const querySnapshot = await getDocs(collection($db, 'memories'))
  
        this.memories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      } catch (error) {
        console.error('Error fetching memories:', error)
      }
    },
  },

  getters: {
    memory: (state) => {
      return (memoryId) =>
        state.memories.find((memory) => memory.id === memoryId)
    },
  },
})

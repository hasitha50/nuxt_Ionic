<template>
    <BaseLayout page-title="Add a Memory" page-default-back-link="/memories">
        <template #title>Add A Memory</template>
      <CreateMemoryForm />
    </BaseLayout>
  </template>

  <script setup>
  import BaseLayout from '../../componets/BaseLayout.vue'
  import CreateMemoryForm from '../../componets/memories/CreateMemoryForm.vue'
  

  </script>
  
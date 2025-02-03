<template>
  <div><pre>{{ user }}</pre></div>
</template>

<script setup>
import { useAuthStore } from 'src/stores';

const { user } = useAuthStore();
</script>

<style scoped>

</style>

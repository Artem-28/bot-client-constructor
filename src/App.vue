<template>
  <router-view />
</template>

<script setup>
import { useErrorHandler } from 'src/composable';

useErrorHandler();
</script>

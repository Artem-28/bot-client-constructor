<template>
  <router-view />
</template>

<script setup>
import { useErrorHandler } from 'src/composable';
import useDataLoader from 'src/composable/use-data-loader.composable';

useErrorHandler();
useDataLoader();
</script>

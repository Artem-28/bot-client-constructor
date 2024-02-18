<template>
  <q-list class="app-menu">
    <app-menu-item
      v-for="item in menuItems"
      :key="item.name"
      :item="item"
    />
  </q-list>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps, withDefaults, onMounted, watch } from 'vue';
import {menu} from 'components/global/app-menu/app-menu';
import AppMenuItem from 'components/global/app-menu/AppMenuItem.vue';
import { useRouter } from 'vue-router';
import {MenuItem} from 'src/types/component.type';

/* Composition */
// import you composition api...

/* Components */
// import you components...

/* Types */
// declare components component...
interface Props {
  value?: string;
}
interface Emit {
  (e: 'update:modelValue', value: string): void;
}

/* Props */
// property default value...
const props = withDefaults(defineProps<Props>(), {
  value: ''
});

/* Emits */
const emit = defineEmits<Emit>();

/* Data */
// declare reactive variables...

/* Composition */
// declare you composition api...
const router = useRouter();

/* Life hooks */
// life cycle hooks...
// watch(() => router.currentRoute.value, (to, from) => {
//   console.log('to', to);
//   console.log('from', from);
// });
/* Computed */
// you computational properties...
const menuItems = computed(() => {
  const items: MenuItem[] = [];
  menu.forEach(item => {
    const visible = checkVisibleItem(item);
    if (!visible) return;
    item.path = getPathItem(item);
    items.push(item);
  });
  return items;
});

/* Methods */
// promote your methods...
const checkVisibleItem = (item: MenuItem) => {
  if (typeof item.visible === 'boolean') return item.visible;
  const route = router.currentRoute.value;
  return item.visible(route);
};
const getPathItem = (item: MenuItem) => {
  if (typeof item.path === 'string') return item.path;
  const route = router.currentRoute.value;
  return item.path(route);
};
</script>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
.app-menu {
  padding: 0 16px;
}
</style>

<template>
  <div class="base-table bg-system--secondary">
    <div
      :style="itemStyle"
      class="base-table-header text--bold"
    >
      <div
        v-for="column in columns"
        :key="column.name"
        class="base-table-item__cell"
      >
        <span v-text="column.label" />
      </div>
    </div>
    <div class="base-table-list">
      <q-item
        v-for="(item, index) in items"
        :key="index"
        :clickable="clickable"
        :style="itemStyle"
        class="base-table-item text-color--primary bg-system--primary"
        @click="clickHandle(item)"
      >
        <div
          v-for="column in columns"
          :key="column.name"
          class="base-table-item__cell text-color--primary"
        >
          <slot :name="`cell:${column.name}`" :item="item" :value="item[column.name]" >
            <span v-text="item[column.name] || ''" />
          </slot>
        </div>
      </q-item>
    </div>
  </div>
</template>

<script setup>

// Props
import { computed } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
  hideHeader: {
    type: Boolean,
    default: false,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  gridColumns: {
    type: String,
    default: '1fr',
  },
});

// Emits
const emit = defineEmits(['click:item']);

// Variables

// Reactive variables

// Composition

// Computed
const itemStyle = computed(() => {
  return { 'grid-auto-columns': props.gridColumns };
});

// Watch

// Hooks

// Methods
function clickHandle(item) {
  if (!props.clickable) return;
  emit('click:item', item);
}
</script>

<style scoped lang="scss">
.base-table {
  border-radius: 8px;
  padding: 18px;
}
.base-table-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.base-table-item, .base-table-header {
  display: grid;
  grid-auto-columns: 1fr 1fr 1fr 100px;
  grid-auto-flow: column;
  border-radius: 8px;
}
.base-table-item {
  padding: 0;
  min-height: 40px;
  &__cell {
    display: flex;
    align-items: center;
    padding: 8px 18px;
  }
}
</style>

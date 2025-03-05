<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="isMini"
    :mini-width="76"
    :width="200"
    :breakpoint="0"
    bordered
    class="app-drawer"
  >
    <q-list>
      <q-btn
        color="primary"
        flat
        unelevated
        square
        class="width-control"
        @click="toggleMini"
      >
        <q-icon
          :name="widthControlIcon"
          size="20px"
        />
      </q-btn >
      <q-item class="app-drawer-item">
        <div class="app-drawer-item__content clickable-el">
          <q-item-section avatar>
            <q-icon name="inbox" size="22px" />
          </q-item-section>
          <q-item-section>
            <span v-text="'fsdf'" />
          </q-item-section>
        </div>

      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup>
// Props

// Emits

// Variables
import { computed, ref } from 'vue';

const drawer = ref(false);
const isMini = ref(true);

// Reactive variables

// Composition

// Computed
const widthControlIcon = computed(() => isMini.value ? 'chevron_right' : 'chevron_left');

// Watch

// Hooks

// Methods
function toggleMini() {
  isMini.value = !isMini.value;
}
</script>

<style lang="scss">
.app-drawer {
  overflow: visible;
}
</style>

<style scoped lang="scss">
.width-control {
  position: absolute;
  background-color: #FFFFFF;
  padding: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  height: 40px;
  width: 18px;
  right: -18px;
  top: calc(50% - 20px);
  border-radius: 0 50% 50% 0;
  border: 1px solid $border;
}
.app-drawer-item {
  padding: 12px !important;
  display: flex;
  &__content {
    height: 48px;
    width: 100%;
    display: flex;
    padding: 0 14px;
    border-radius: 8px;
    background-color: $primary;
  }
}
</style>

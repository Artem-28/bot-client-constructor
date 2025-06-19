<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="isMini"
    :mini-width="76"
    :width="260"
    :breakpoint="0"
    bordered
    class="app-drawer"
  >
    <q-list class="app-drawer-list" >
      <q-btn
        color="primary"
        flat
        unelevated
        square
        class="width-control separator"
        @click="toggleMini"
      >
        <q-icon
          :name="widthControlIcon"
          size="20px"
        />
      </q-btn >
      <div
        v-for="item in appDrawerMenu"
        :key="item.code"
        class="app-drawer-item-wrap"
      >
        <q-item
          :to="item.to"
          :exact="item.code === 'projects'"
          active-class="app-drawer-item--active"
          class="app-drawer-item"
        >
          <q-item-section avatar class="app-drawer-item__section">
            <q-icon
              :name="item.icon"
              size="22px"
              class="app-drawer-item__icon text-color--primary"
            />
          </q-item-section>
          <q-item-section class="app-drawer-item__section">
            <span
              v-text="$t(item.label)"
              class="app-drawer-item__text text-color--dark text-bold" />
          </q-item-section>
        </q-item>

      </div>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { computed, ref } from 'vue';
import appDrawerMenu from 'components/app/app-drawer/app-drawer-menu';
import { useRoute } from 'vue-router';

// Props

// Emits

// Variables
const route = useRoute();
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
// eslint-disable-next-line no-unused-vars
function isActive(item) {
  console.log('item', item);
  console.log('route', route);
}
</script>

<style lang="scss">
.app-drawer {
  overflow: visible;
  display: flex;
  flex-direction: column;
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
}
.app-drawer-item-wrap {
  padding: 0 17px;
  margin: 16px 0;
  display: flex;
}
.app-drawer-item {
  height: 40px;
  min-height: 40px;
  width: 100%;
  display: flex;
  padding: 0 9px;
  border-radius: 8px;
  color: $primary;
  gap: 14px;
  &__section {
    padding: 0;
    width: fit-content;
    min-width: auto;
  }
  &--active {
    background-color: $primary;
    color: #FFFFFF;
    .app-drawer-item__icon {
      color: #FFFFFF;
    }
    .app-drawer-item__text {
      color: #FFFFFF;
    }
  }
}
</style>

<template>
  <div class="messenger-template bg-color--secondary">
    <q-layout view="hHh Lpr lff" container>
      <q-page ref="menuRef" class="bg-color--white">
        <section :style="heightStyle" class="messenger-section">
          <slot name="menu-header" />

          <div class="messenger-section__content">
            <slot name="menu-content" />
          </div>
        </section>
      </q-page>

      <q-drawer
        v-model="drawer"
        side="right"
        :width="menuSize.width"
        :breakpoint="0"
        overlay
        @hide="onHideDrawer"
      >
        <section :style="heightStyle" class="messenger-section">
          <slot name="drawer-header" />

          <div class="messenger-section__content">
            <slot name="drawer-content" />
          </div>
        </section>
      </q-drawer>
    </q-layout>

    <section :style="heightStyle" class="messenger-section">
      <slot name="header" />

      <div
        ref="contentRef"
        class="messenger-section__content messages-container"
      >
        <slot />
      </div>

      <slot name="footer" />
    </section>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import { MessengerTemplateKey } from 'src/utils/symbols.util';
import { useConfirm, useResizeObserver, useScroll } from 'src/composable';
// Props

// Emits

// Variables

// Reactive variables
const drawer = ref(false);
const contentRef = ref(null);
const menuRef = ref(null);
const menuSize = ref({ width: 0, height: 0 });

// Composition
const { confirm: confirmHideMenu, accept: acceptHideMenu } = useConfirm();
const { scrollPosition } = useScroll(contentRef);

useResizeObserver(menuRef, (size) => {
  menuSize.value.width = size.width;
  menuSize.value.height = size.height;
});

// Computed
const heightStyle = computed(() => {
  return { height: `${menuSize.value.height}px` };
});

// Watch

// Hooks

// Methods
function openDrawer() {
  drawer.value = true;
}

function closeDrawer() {
  drawer.value = false;
  return confirmHideMenu();
}

function onHideDrawer() {
  acceptHideMenu(true);
}

provide(MessengerTemplateKey, {
  openDrawer,
  closeDrawer,
  scrollPosition,
  contentRef,
});
</script>

<style scoped lang="scss">
.messenger-template {
  display: grid;
  grid-template-columns: 35% 1fr;
  width: 100%;
  height: 100%;
}
.messenger-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__content {
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    margin: auto 0;
  }
}
.messages-container {
  display: flex;
  flex-direction: column-reverse;
}
</style>

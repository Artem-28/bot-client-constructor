<template>
  <div ref="rootRef" class="messenger-template">
    <base-section view="hhr Lpr ffr" class="bg-system--primary">
      <base-section-header>
        <slot name="left-header" />
      </base-section-header>

      <base-section-container>
        <div class="messenger-template__content hide-scrollbar">
          <slot name="left" />
        </div>
      </base-section-container>

      <base-drawer
        v-model="drawer.left"
        side="right"
        fill
        overlay
        @hide="hideDrawer.left.accept"
      >
        <base-section class="bg-system--primary">
          <base-section-header>
            <slot name="left-drawer-header" />
          </base-section-header>

          <base-section-container>
            <div class="messenger-template__content hide-scrollbar">
              <slot name="left-drawer" />
            </div>
          </base-section-container>
        </base-section>
      </base-drawer>
    </base-section>

    <base-section view="hHr Lpr fFr">
      <base-section-header class="bg-system--primary">
        <slot name="header" />
      </base-section-header>

      <base-section-container>
        <div
          ref="contentRef"
          class="messenger-template__content messages-container hide-scrollbar"
        >
          <slot/>
        </div>
      </base-section-container>

      <base-drawer v-model="drawer.right" side="right">
        <base-section class="bg-system--primary" />
      </base-drawer>

      <base-section-footer class="bg-system--primary">
        <slot name="footer" />
      </base-section-footer>
    </base-section>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import { useConfirm, useScroll } from 'src/composable';
import { MessengerTemplateKey } from 'src/utils/symbols.util';
import BaseSectionFooter from 'components/base/base-section-footer/base-section-footer';
import BaseSection from 'components/base/base-section/base-section';
import BaseDrawer from 'components/base/base-drawer/base-drawer';
import BaseSectionContainer from 'components/base/base-section-container/base-section-container';
import BaseSectionHeader from 'components/base/base-section-header/base-section-header';

// Props

// Emits

// Variables

// Reactive variables
const drawer = ref({
  left: false,
  right: true,
});
const contentRef = ref(null);

// Composition
const { scrollPosition } = useScroll(contentRef);
const hideDrawer = {
  left: useConfirm(),
  right: useConfirm(),
};

// Computed

// Watch

// Hooks

// Methods
function openDrawer(side = 'left') {
  drawer.value[side] = true;
}

function closeDrawer(side = 'left') {
  drawer.value[side] = false;
  return hideDrawer[side].confirm();
}

provide(MessengerTemplateKey, {
  drawer,
  openDrawer,
  closeDrawer,
  scrollPosition,
  contentRef,
});
</script>

<style scoped lang="scss">
.messenger-template {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 25% 1fr;
  &__content {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
.messages-container {
  display: flex;
  flex-direction: column-reverse;
}
</style>

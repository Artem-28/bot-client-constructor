<template>
  <div ref="containerRef" class="messenger-bubbles-group">
    <div ref="headerRef" :class="headerClasses">
      <q-badge class="bg-color--primary text--sm" rounded>
        <span v-text="displayDate" />
      </q-badge>
    </div>
    <div class="messenger-bubbles-group__content">
      <template v-for="n in count" :key="group.messages[ count - n].id">
        <slot :item="group.messages[ count - n]" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref, watch } from 'vue';
import { MessengerTemplateKey } from 'src/utils/symbols.util';
import { useTimeout } from 'src/composable';
import { useI18n } from 'vue-i18n';

// Props
const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
});
// Emits

// Variables
const i18n = useI18n();
const template = inject(MessengerTemplateKey, {});
const monthIndex = props.group.date.getMonth();
const month = i18n.t(`months.genitive.${monthIndex}`);
const displayDate = `${props.group.date.getDate()} ${month}`;

// Reactive variables
const containerRef = ref(null);
const headerRef = ref(null);
const outsideHeader = ref(false);
const touch = ref(false);

// Composition
const { restart } = useTimeout(updateVisibleHeader, 2000);

// Computed
const count = computed(() => props.group.messages.length);

const headerClasses = computed(() => {
  const classes = ['messenger-bubbles-group__header'];

  if (outsideHeader.value) {
    classes.push('fade-out');
  }
  if (!touch.value) return classes;

  classes.push('messenger-bubbles-group__header--sticky');
  const visible = headerRef.value.classList.contains('fade-out');
  if (!outsideHeader.value && visible) {
    classes.push('fade-in');
  }
  return classes;
});

// Watch
watch(template.scrollPosition, () => {
  touch.value = true;
  outsideHeader.value = false;
  restart();
});

// Hooks
onMounted(() => updateVisibleHeader());

// Methods
function updateVisibleHeader() {
  const rootRect = template.contentRef.value.getBoundingClientRect();
  const containerRect = containerRef.value.getBoundingClientRect();
  const position = containerRect.top - rootRect.top;
  outsideHeader.value = position < -12;
}
</script>

<style scoped lang="scss">
.messenger-bubbles-group {
  position: relative;
  &__content {
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;
    padding: 8px;
  }
  &__header {
    display: flex;
    justify-content: center;
    padding-top: 4px;
    opacity: 1;
  }
  &__header--sticky {
    top: 4px;
    position: sticky;
  }
}

.fade-out {
  animation: fadeOut 1s ease-in-out forwards;
}

.fade-in {
  animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

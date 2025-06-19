<template>
  <div class="messenger-panel">
    <base-icon-btn
      icon="attach_file"
      class="messenger-panel__action action-attach" />
    <q-input
      ref="fieldRef"
      :autogrow="autogrow"
      dense
      borderless
      color="primary"
      class="messenger-panel__field"
      v-model.trim="textMessage"
      @keydown.enter="sendMessage"
      @focus="onFocus"
      :placeholder="$t('field.placeholder.message')"
    />
    <base-icon-btn
      icon="sentiment_satisfied"
      class="messenger-panel__action"
    />
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import BaseIconBtn from 'components/base/base-icon-btn/base-icon-btn';

// Props

// Emits

// Variables

// Reactive variables
const fieldRef = ref(null);
const textMessage = ref('');
const autogrow = ref(false);

// Composition

// Computed

// Watch

// Hooks

// Methods
function onFocus() {
  autogrow.value = true;
  nextTick(() => {
    fieldRef.value.focus();
  });
}

function clearField() {
  textMessage.value = '';
}

function sendMessage(e) {
  if (e.shiftKey) return;
  e.preventDefault();
  e.stopPropagation();
  if (!textMessage.value) return;
  const message = {
    text: textMessage.value,
  };

  console.log('send Message', message);
  clearField();
}
</script>

<style scoped lang="scss">
.messenger-panel {
  display: flex;
  align-items: end;
  gap: 12px;
  justify-content: end;
  padding: 16px;
  &__field {
    min-height: 48px;
    width: 100%;
    background: #F6F6F7;
    padding: 0 8px;
  }
  &__action {
    margin-bottom: 12px;
  }
  .action-attach {
    rotate: 45deg;
  }
}

</style>

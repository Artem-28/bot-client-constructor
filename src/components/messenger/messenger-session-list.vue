<template>
  <messenger-chat-item
    v-for="session in sessions"
    :key="session.id"
    :session="session"
    @click:item="clickItem"
  />
</template>

<script setup>
import { computed, inject } from 'vue';
import { MessengerKey } from 'src/utils/symbols.util';
import MessengerChatItem from 'components/messenger/messenger-chat-item';

// Props

// Emits

// Variables

// Reactive variables

const messenger = inject(MessengerKey, {});

// Composition

// Computed
const sessions = computed(() => messenger.getSessions(messenger.activeGroup.value?.id).value);

// Watch

// Hooks

// Methods
function clickItem(session) {
  messenger.setActiveSession(session.id);
  messenger.loadMessages();
}
</script>

<style scoped lang="scss">

</style>

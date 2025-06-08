<template>
  <messenger-chat-item
    v-for="session in messenger.lastSessions.value"
    :key="session.id"
    group-name
    :session="session"
    @click:item="clickItem"
  />
</template>

<script setup>
import { inject } from 'vue';
import { MessengerKey, MessengerTemplateKey } from 'src/utils/symbols.util';
import MessengerChatItem from 'components/messenger/messenger-chat-item';

// Props

// Emits

// Variables
const template = inject(MessengerTemplateKey, {});
const messenger = inject(MessengerKey, {});

// Reactive variables

// Composition

// Computed

// Watch

// Hooks

// Methods
messenger.loadMessengers();

function clickItem(session) {
  template.openDrawer();
  messenger.setActiveGroup(session.script_id);
  messenger.loadSessions();
}
</script>

<style scoped>

</style>

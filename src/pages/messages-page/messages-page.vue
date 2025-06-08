<template>
  <messenger-template>
    <template v-slot:menu-header>
      <messenger-group-header />
    </template>

    <template v-slot:menu-content>
      <messenger-group-list />
    </template>

    <template v-slot:drawer-header>
      <messenger-session-header />
    </template>

    <template v-slot:drawer-content>
      <messenger-session-list />
    </template>

    <messenger-content />

    <template v-slot:footer>
      <messenger-panel />
    </template>

  </messenger-template>
</template>

<script setup>
import MessengerTemplate from 'components/messenger/messenger-template';
import MessengerGroupList from 'components/messenger/messenger-group-list';
import { useMessenger } from 'components/messenger/use-messenger.composable';
import { provide } from 'vue';
import { MessengerKey } from 'src/utils/symbols.util';
import MessengerSessionList from 'components/messenger/messenger-session-list';
import MessengerSessionHeader from 'components/messenger/messenger-session-header';
import MessengerContent from 'components/messenger/messenger-content';
import MessengerPanel from 'components/messenger/messenger-panel';
import MessengerGroupHeader from 'components/messenger/messenger-group-header';
// Props

// Emits

// Variables

// Reactive variables
const messenger = useMessenger();

provide(MessengerKey, messenger);

// Composition

// Computed

// Watch

// Hooks

// Methods
</script>

<style scoped lang="scss">

</style>

<template>
  <messenger-template>
    <template v-slot:left-header>
      <messenger-group-header />
    </template>

    <template v-slot:left>
      <messenger-group-list />
    </template>

    <template v-slot:left-drawer-header>
      <messenger-session-header />
    </template>

    <template v-slot:left-drawer>
      <messenger-session-list />
    </template>

    <template v-slot:header>
      <messenger-header />
    </template>

    <messenger-bubbles-group
      v-for="n in groupsCount"
      :key="messenger.messageGroups.value[groupsCount - n].date"
      :group="messenger.messageGroups.value[groupsCount - n]"
    >

      <template v-slot:default="{ item }">
        <pre>{{ item }}</pre>
      </template>

    </messenger-bubbles-group>

    <template v-slot:footer>
      <messenger-panel />
    </template>

  </messenger-template>
</template>

<script setup>
import { computed, provide } from 'vue';
import { useMessenger } from 'components/messenger/use-messenger.composable';
import { MessengerKey } from 'src/utils/symbols.util';
import MessengerTemplate from 'components/messenger/messenger-template';
import MessengerGroupList from 'components/messenger/messenger-group-list';
import MessengerSessionList from 'components/messenger/messenger-session-list';
import MessengerSessionHeader from 'components/messenger/messenger-session-header';
import MessengerPanel from 'components/messenger/messenger-panel';
import MessengerGroupHeader from 'components/messenger/messenger-group-header';
import MessengerBubblesGroup from 'components/messenger/messenger-bubbles-group';
import MessengerHeader from 'components/messenger/messenger-header';
// Props

// Emits

// Variables

// Reactive variables
const messenger = useMessenger();
const groupsCount = computed(() => messenger.messageGroups.value.length);

provide(MessengerKey, messenger);

// Composition

// Computed

// Watch

// Hooks

// Methods
</script>

<style scoped lang="scss">

</style>

<template>
  <div
    class="messenger-chat-item clickable-el"
    @click="clickItem"
  >
    <base-avatar :item="avatar" :size="54" />
    <div class="messenger-chat-item__content">
      <div class="messenger-chat-item__title">
        <span
          v-if="title"
          class="text--truncate text-color--dark text--md text--bold"
          v-text="title"
        />

        <span
          class="messenger-chat-item__date text--sm text-color--gray"
          v-text="displayDate"
        />
      </div>

      <div class="text--truncate text-color--dark text--sm">
        <span class="text--bold" v-text="$t('session.fields.id') + ':'" />
        <span v-text="` ${session.id}`" />
      </div>

      <div class="text--truncate text--sm">
        <span
          class="text-color--primary text--bold"
          v-text="`#${respondent.id} ${authorName}: `"
        />
        <span v-if="lastMessage" class="text-color--gray" v-text="lastMessage.text" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { MessengerKey } from 'src/utils/symbols.util';
import BaseAvatar from 'components/base/base-avatar/base-avatar';
import { useI18n } from 'vue-i18n';
import moment from 'moment';

// Props
const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
  groupName: {
    type: Boolean,
    required: false,
  },
});

// Emits
const emit = defineEmits(['click:item']);

// Variables
const i18n = useI18n();

// Reactive variables
const messenger = inject(MessengerKey, {});

// Composition
const lastMessage = messenger.getLastMessage(props.session.id);
const respondent = messenger.getRespondent(props.session.respondent_id);

// Computed
const respondentName = computed(() => {
  const name = respondent.value?.name;
  if (name === 'respondent.new') return i18n.t('respondent.unknown');
  return name;
});

const title = computed(() => {
  if (!props.groupName) return respondentName.value;
  const group = messenger.getGroup(props.session.script_id);
  return group.value?.title;
});

const avatar = computed(() => {
  return {
    title: title.value,
  };
});

const authorName = computed(() => {
  if (!lastMessage.value) return '';
  const authorType = lastMessage.value?.author_type;
  if (authorType === 'respondent') return respondentName.value;
  if (authorType === 'operator') {
    const operator = messenger.getOperator(lastMessage.value.operator_id);
    return operator.value?.name || '';
  }
  return '';
});

const displayDate = computed(() => {
  if (!lastMessage.value) return '';
  const currentDate = moment();
  const messageDate = moment(lastMessage.value.created_at);

  const currentTime = new Date(currentDate.format('DD/MM/YYYY')).getTime();
  const messageTime = new Date(messageDate.format('DD/MM/YYYY')).getTime();

  if (messageTime === currentTime) {
    return messageDate.format('HH:mm');
  }
  if (messageDate.week() === currentDate.week()) {
    return i18n.t(`days.shorts.${messageDate.day()}`);
  }
  return messageDate.format('DD.MM.YYYY');
});

// Watch

// Hooks

// Methods
function clickItem() {
  emit('click:item', props.session);
}
</script>

<style scoped lang="scss">
.messenger-chat-item {
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
  &__content {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
  }
  &__title {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  &__date {
    margin-left: auto;
  }
}

</style>

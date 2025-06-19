<template>
  <div class="messenger-bubble-wrapper">
    <div :class="rootClasses">
      <div class="text--medium text--sm">
        <span class="author-name" v-text="authorName" />
      </div>

      <div class="bubble-message">
        <span v-text="message.text" />
        <div class="time text--xs">
          <span class="time__inner" v-text="time" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { hClasses } from 'src/helpers/h-classes.helper';
import moment from 'moment';
import { inject } from 'vue';
import { MessengerKey } from 'src/utils/symbols.util';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const messenger = inject(MessengerKey, {});
const i18n = useI18n();

const time = moment(props.message.created_at).format('HH:mm');
const session = messenger.getSession(props.message.session_id).value;
const operator = messenger.getOperator(props.message.operator_id).value;
const respondent = messenger.getRespondent(session.respondent_id).value;
const authorName = getAuthorName();
const rootClasses = hClasses('messenger-bubble')
  .mixin()
  .append(props.message.outgoing ? 'outgoing' : 'incoming')
  .mixin()
  .append(props.message.author_type)
  .value();

function getOperatorName() {
  if (props.message.outgoing) return 'Вы';
  return operator.name;
}

function getRespondentName() {
  if (!respondent) return null;
  if (respondent.name === 'respondent.new') {
    return i18n.t('respondent.unknown');
  }
  return respondent.name;
}

function getAuthorName() {
  const type = props.message.author_type;
  switch (type) {
    case 'operator':
      return getOperatorName();
    case 'respondent':
      return getRespondentName();
    case 'system':
      return 'system';
  }
}
</script>

<style scoped lang="scss">
.messenger-bubble-wrapper {
  display: flex;
  width: 100%;
}

.author-name {
  color: $primary;
}
.time {
  position: relative;
  float: right;
  direction: ltr;
  vertical-align: middle;
  line-height: 1;
  height: 22px;
  width: 48px;
  &__inner {
    bottom: 0;
    right: 0;
    position: absolute;
  }
}

.messenger-bubble {
  padding: 6px;
  border-radius: 12px;
  word-break: break-word;
  white-space: pre-wrap;
  max-width: 40%;
  &--outgoing {
    margin-left: auto;
  }
  &--incoming {
    margin-right: auto;
  }
  &--respondent {
  }
}

</style>

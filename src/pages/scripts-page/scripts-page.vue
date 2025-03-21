<template>
  <div class="scripts">
    <div class="scripts-header">
      <span v-text="$t('page.scripts.title')" class="font-24 text-bold" />
      <q-input
        v-model="search"
        outlined
        dense
        :placeholder="$t('field.placeholder.search')"
        class="scripts-header__search"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn
        :label="$t('button.create_script')"
        color="primary"
        unelevated
        no-caps
        class="scripts-header__btn text-bold font-16"
        @click="showDialog"
      />
    </div>

    <scripts-list v-if="project" ref="refList" :project="project" />

    <base-dialog
      v-model="dialogIsShow"
      :title="$t('page.scripts.create_script')"
    >
      <create-script-form @create:script="addScript" />
    </base-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import BaseDialog from 'components/base/base-dialog/base-dialog';
import CreateScriptForm from 'components/general/forms/create-script-form/create-script-form';
import ScriptsList from 'components/general/scripts-list/scripts-list';
import { useProjectStore } from 'src/stores';

// Props

// Emits

// Variables
const projectStore = useProjectStore();

// Reactive variables
const search = ref('');
const dialogIsShow = ref(false);
const refList = ref(null);

// Composition

// Computed
const project = computed(() => projectStore.project);

// Watch

// Hooks

// Methods
function showDialog() {
  dialogIsShow.value = true;
}
function hideDialog() {
  dialogIsShow.value = false;
}
function addScript(script) {
  hideDialog();
  refList.value.addScript(script);
}
</script>

<style scoped lang="scss">
.scripts {
  height: 100%;
  width: 100%;
  padding: 24px 16px;
  background-color: $bg-primary;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 8px;
}
.scripts-header {
  display: flex;
  gap: 24px;
  width: 100%;
  align-items: center;
  &__search {
    width: 100%;
    max-width: 800px;
    margin-left: auto;
  }
  &__btn {
    min-width: fit-content;
  }
}
</style>

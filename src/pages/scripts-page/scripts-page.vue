<template>
  <app-page>
    <app-page-header :title="$t('page.scripts.title')">
      <template #actions>
        <q-input
          v-model="search"
          outlined
          dense
          :placeholder="$t('field.placeholder.search')"
          class="scripts-search"
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
          class="text--bold text--md"
          @click="showDialog"
        />
      </template>
    </app-page-header>

    <scripts-list
      :scripts="scripts"
      @update:script="updateScript"
      @delete:script="deleteScript"
    />

    <base-dialog
      v-model="dialogIsShow"
      :title="$t('page.scripts.create_script')"
    >
      <create-script-form @create:script="addScript" />
    </base-dialog>
  </app-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import BaseDialog from 'components/base/base-dialog/base-dialog';
import CreateScriptForm from 'components/general/forms/create-script-form/create-script-form';
import ScriptsList from 'components/general/scripts-list/scripts-list';
import AppPage from 'components/app/app-page/app-page';
import AppPageHeader from 'components/app/app-page/app-page-header/app-page-header';
import { useProjectStore } from 'src/stores';
import useApi from 'src/api';

// Props

// Emits

// Variables
const projectStore = useProjectStore();
const api = useApi();

// Reactive variables
const search = ref('');
const dialogIsShow = ref(false);
const scripts = ref([]);

// Composition

// Computed
const project = computed(() => projectStore.project);

// Watch
onMounted(async () => {
  scripts.value = await getScripts();
});

// Hooks

// Methods
async function getScripts() {
  try {
    const projectId = project.value.id;
    const { data } = await api.getScripts(projectId);
    return data;
  } catch (e) {}
}
function addScript(script) {
  hideDialog();
  scripts.value.push(script);
}
function deleteScript(script) {
  scripts.value = scripts.value.filter(s => s.id !== script.id);
}
function updateScript(script) {
  const index = scripts.value.findIndex(item => item.id === script.id);
  if (index < 0) return;
  scripts.value.splice(index, 1, script);
}
function showDialog() {
  dialogIsShow.value = true;
}
function hideDialog() {
  dialogIsShow.value = false;
}
</script>

<style scoped lang="scss">
.scripts-search {
  width: 100%;
  max-width: 800px;
}
</style>

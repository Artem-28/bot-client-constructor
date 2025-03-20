<template>
  <base-table
    :columns="columns"
    :items="scripts"
    clickable
    grid-columns="1fr 80px"
  >
    <template #cell-controls="{ item }">
      <div class="script-controls">
        <q-icon
          name="more_horiz"
          size="20px"
          class="cursor-pointer"
        >
          <q-menu :offset="[0, 14]">
            <script-menu @command="c => commandHandle(c, item)" />
          </q-menu>
        </q-icon>
      </div>
    </template>
  </base-table>
  <base-dialog
    v-model="deleteDialog"
    confirm-key="delete"
    :title="$t('page.scripts.delete_script')"
    :accept="$t('button.delete')"
    :cancel="$t('button.cancel')"
    :accept-fn="deleteScript"
  >
    <span v-text="$t('page.scripts.delete_script_confirm')" class="text-center" />
  </base-dialog>
</template>

<script setup>
import BaseTable from 'components/base/base-table/base-table';
import { getCurrentInstance, onBeforeMount, ref } from 'vue';
import useApi from 'src/api';
import { useRoute } from 'vue-router';
import BaseDialog from 'components/base/base-dialog/base-dialog';
import ScriptMenu from 'components/general/scripts-list/script-menu/script-menu';
import { SCRIPT_COMMANDS } from 'components/general/scripts-list/script-menu/script-menu-items';
import { useConfirm } from 'src/composable';

// Props

// Emits

defineExpose({
  addScript,
});

// Variables
const api = useApi();
const route = useRoute();
const { proxy } = getCurrentInstance();
const columns = [
  { name: 'title', label: proxy.$t('base.title') },
  { name: 'controls', label: '' },
];

// Reactive variables
const scripts = ref([]);
const deleteDialog = ref(false);

// Composition
const { confirm: deleteConfirm } = useConfirm('delete');

// Computed

// Watch

// Hooks
onBeforeMount(async () => {
  const { project_id } = route.params;
  scripts.value = await getScripts(project_id);
});

// Methods
async function getScripts(projectId) {
  try {
    const { data } = await api.getScripts({ projectId });
    return data;
  } catch (e) {}
}
function addScript(script) {
  scripts.value.push(script);
}
async function deleteScriptHandle(item) {
  deleteDialog.value = true;
  await deleteConfirm(item);
  deleteDialog.value = false;
}
async function deleteScript(item) {
  console.log('deleteScript', item);
}
function commandHandle(code, item) {
  switch (code) {
    case SCRIPT_COMMANDS.RENAME: {
      break;
    }
    case SCRIPT_COMMANDS.DELETE: {
      deleteScriptHandle(item);
      break;
    }
  }
}
</script>

<style scoped lang="scss">
.script-controls {
  display: flex;
  width: 100%;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
}

</style>

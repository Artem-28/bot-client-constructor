<template>
  <base-table
    v-if="scripts.length"
    :columns="columns"
    :items="scripts"
    clickable
    grid-columns="1fr 60px"
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
    sync
  >
    <span v-text="$t('page.scripts.delete_script_confirm')" class="text-center" />
  </base-dialog>

  <base-dialog
    v-model="renameDialog"
    confirm-key="rename"
    :title="$t('page.scripts.rename_script')"
  >
    <template #default="{ data }">
      <rename-script-form v-if="data" :script="data" @update:script="renameScript" />
    </template>
  </base-dialog>
</template>

<script setup>
import BaseTable from 'components/base/base-table/base-table';
import {
  getCurrentInstance,
  onMounted,
  ref,
} from 'vue';
import useApi from 'src/api';
import BaseDialog from 'components/base/base-dialog/base-dialog';
import ScriptMenu from 'components/general/scripts-list/script-menu/script-menu';
import { SCRIPT_COMMANDS } from 'components/general/scripts-list/script-menu/script-menu-items';
import { useConfirm } from 'src/composable';
import RenameScriptForm from 'components/general/forms/rename-script-form/rename-script-form';

// Props
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

// Emits

defineExpose({
  addScript,
});

// Variables
const api = useApi();
const { proxy } = getCurrentInstance();
const columns = [
  { name: 'title', label: proxy.$t('base.title') },
  { name: 'controls', label: '' },
];

// Reactive variables
const scripts = ref([]);
const deleteDialog = ref(false);
const renameDialog = ref(false);

// Composition
const { confirm: deleteConfirm } = useConfirm('delete');
const { confirm: renameConfirm } = useConfirm('rename');

// Computed

// Watch

// Hooks
onMounted(async () => {
  scripts.value = await getScripts();
});

// Methods
async function getScripts() {
  try {
    const projectId = props.project.id;
    const { data } = await api.getScripts({ projectId });
    return data;
  } catch (e) {}
}
function addScript(script) {
  scripts.value.push(script);
}
function updateScript(script) {
  const index = scripts.value.findIndex(item => item.id === script.id);
  if (index < 0) return;
  scripts.value.splice(index, 1, script);
}
async function renameScriptHandle(item) {
  renameDialog.value = true;
  renameConfirm(item);
}
function renameScript(script) {
  renameDialog.value = false;
  updateScript(script);
}
async function deleteScriptHandle(item) {
  deleteDialog.value = true;
  await deleteConfirm(item);
  deleteDialog.value = false;
}
async function deleteScript(item) {
  try {
    const projectId = props.project.id;
    const { success } = await api.deleteScript({ projectId, scriptId: item.id });
    if (!success) return;
    scripts.value = scripts.value.filter(s => s.id !== item.id);
  } catch (e) {}
}
async function commandHandle(code, item) {
  switch (code) {
    case SCRIPT_COMMANDS.RENAME: {
      await renameScriptHandle(item);
      break;
    }
    case SCRIPT_COMMANDS.DELETE: {
      await deleteScriptHandle(item);
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

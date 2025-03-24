<template>
  <base-table
    v-if="scripts.length"
    :columns="columns"
    :items="scripts"
    clickable
    grid-columns="1fr 60px"
  >
    <template #cell:controls="{ item }">
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
import { computed, ref } from 'vue';
import useApi from 'src/api';
import BaseDialog from 'components/base/base-dialog/base-dialog';
import ScriptMenu from 'components/general/scripts-list/script-menu/script-menu';
import { SCRIPT_COMMANDS } from 'components/general/scripts-list/script-menu/script-menu-items';
import { useConfirm } from 'src/composable';
import RenameScriptForm from 'components/general/forms/rename-script-form/rename-script-form';
import { useI18n } from 'vue-i18n';
import { useProjectStore } from 'src/stores';

// Props
defineProps({
  scripts: {
    type: Array,
    default: () => [],
  },
});

// Emits
const emits = defineEmits(['update:script', 'delete:script']);

// Variables
const projectStore = useProjectStore();
const api = useApi();
const { t } = useI18n();
const columns = [
  { name: 'title', label: t('base.title') },
  { name: 'controls', label: '' },
];

// Reactive variables
const deleteDialog = ref(false);
const renameDialog = ref(false);

// Composition
const { confirm: deleteConfirm } = useConfirm('delete');
const { confirm: renameConfirm } = useConfirm('rename');

// Computed
const project = computed(() => projectStore.project);

// Watch

// Hooks

// Methods
async function renameScriptHandle(item) {
  renameDialog.value = true;
  renameConfirm(item);
}
function renameScript(script) {
  renameDialog.value = false;
  emits('update:script', script);
}
async function deleteScriptHandle(item) {
  deleteDialog.value = true;
  await deleteConfirm(item);
  deleteDialog.value = false;
}
async function deleteScript(item) {
  try {
    const projectId = project.value.id;
    const { success } = await api.deleteScript({ projectId, scriptId: item.id });
    if (!success) return;
    emits('delete:script', item);
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

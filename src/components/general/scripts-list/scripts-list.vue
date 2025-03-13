<template>
  <base-table
    :columns="columns"
    :items="scripts"
    :clickable="clickable"
    grid-columns="1fr 80px"
  >
    <template v-slot:cell-controls>
      <div
        class="script-controls"
        @mouseenter="clickableOff"
        @mouseleave="clickableOn"
      >
        <q-btn
          icon="delete"
          unelevated
          flat
          outline
          dense
          padding="2px"
          @click="deleteHandle"
        />
      </div>
    </template>
  </base-table>
  <base-dialog v-model="deleteConfirm">
    <span>fsdfs sdfs</span>
  </base-dialog>
</template>

<script setup>
import BaseTable from 'components/base/base-table/base-table';
import { getCurrentInstance, onBeforeMount, ref } from 'vue';
import useApi from 'src/api';
import { useRoute } from 'vue-router';
import BaseDialog from 'components/base/base-dialog/base-dialog';

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
const clickable = ref(true);
const scripts = ref([]);
const deleteConfirm = ref(false);

// Composition

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
function clickableOn() {
  clickable.value = true;
}
function clickableOff() {
  clickable.value = false;
}
function deleteHandle() {
  deleteConfirm.value = true;
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

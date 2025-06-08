<template>
  <base-table
    v-if="subs.length"
    :columns="columns"
    :items="subs"
    grid-columns="76px 1fr 1fr 1fr 54px"
    clickable
    @click:item="subClickHandle"
  >
    <template #cell:avatar="{ item }">
      <base-avatar :item="item" title-key="name" />
    </template>

    <template #cell:createdAt="{ value }">
      <span v-text="moment(value).format('DD.MM.YYYY')" />
    </template>

    <template #cell:controls="{ item }">
      <q-icon name="close" size="18px" @click.stop="deleteSubHandle(item)" />
    </template>
  </base-table>

  <base-dialog
    v-model="deleteDialog"
    confirm-key="delete"
    :title="$t('page.subs.delete_user')"
    :accept="$t('button.delete')"
    :cancel="$t('button.cancel')"
    :accept-fn="deleteSub"
    sync
  >
    <span v-text="$t('page.subs.delete_user_confirm')" class="text-center" />
  </base-dialog>
</template>

<script setup>
import BaseTable from 'components/base/base-table/base-table';
import {
  computed,
  ref,
} from 'vue';
import useApi from 'src/api';
import BaseDialog from 'components/base/base-dialog/base-dialog';
import { useConfirm } from 'src/composable';
import { useI18n } from 'vue-i18n';
import { useProjectStore } from 'src/stores';
import BaseAvatar from 'components/base/base-avatar/base-avatar';
import moment from 'moment';
import { useRouter } from 'vue-router';

// Props
defineProps({
  subs: {
    type: Array,
    default: () => [],
  },
});

// Emits
const emits = defineEmits(['delete:user']);

// Variables
const projectStore = useProjectStore();
const api = useApi();
const { t } = useI18n();
const router = useRouter();
const columns = [
  { name: 'avatar', label: '' },
  { name: 'name', label: t('base.user') },
  { name: 'email', label: t('base.email') },
  { name: 'createdAt', label: t('base.added_at') },
  { name: 'controls', label: '' },
];

// Reactive variables
const deleteDialog = ref(false);

// Composition
const { confirm: deleteConfirm } = useConfirm('delete');

// Computed
const project = computed(() => projectStore.project);

// Watch

// Hooks

// Methods
async function deleteSubHandle(sub) {
  deleteDialog.value = true;
  await deleteConfirm(sub);
  deleteDialog.value = false;
}
async function deleteSub(sub) {
  try {
    const projectId = project.value.id;
    const subId = sub.id;
    const { success } = await api.deleteSubscriber({ projectId, subId });
    if (!success) return;
    emits('delete:sub', sub);
  } catch (e) {}
}
function subClickHandle(sub) {
  router.push({ name: 'sub', params: { sub_id: sub.id } });
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

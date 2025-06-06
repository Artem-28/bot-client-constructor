<template>
  <app-page>
    <app-page-header :title="$t('page.sub.title.rights')">
      <template #actions>
        <q-btn
          :label="$t('button.save')"
          color="primary"
          unelevated
          no-caps
          :loading="loading.save"
          class="text-bold font-16"
          @click="savePermissions"
        />
      </template>
    </app-page-header>
    <div>
      <q-tree
        v-model:ticked="tree"
        v-if="showTree"
        :nodes="permissions"
        node-key="code"
        tick-strategy="leaf"
        default-expand-all
      >
        <template #default-header="{ node }">
          <span v-if="false" v-text="$t(node.title)" />
          <span v-text="$t(node.code)" />
        </template>
      </q-tree>
    </div>
  </app-page>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import useApi from 'src/api';
import AppPage from 'components/app/app-page/app-page';
import AppPageHeader from 'components/app/app-page/app-page-header/app-page-header';

// Props
const props = defineProps({
  sub: {
    type: Object,
    required: true,
  },
});

// Emits

// Variables
const api = useApi();

// Reactive variables
const tree = ref([]);
const permissions = ref([]);
const loading = ref({
  save: false,
});

// Composition

// Computed
const showTree = computed(() => !!permissions.value.length);

// Watch

// Hooks
onBeforeMount(async () => {
  tree.value = await getSubPermissions();
  permissions.value = await getPermissions();
});

// Methods
async function getPermissions() {
  try {
    const { data } = await api.getPermissionsList();
    return data;
  } catch (e) {
    throw new Error(e);
  }
}
async function getSubPermissions() {
  try {
    const payload = {
      projectId: props.sub.project_id,
      userId: props.sub.id,
    };
    const { data } = await api.getUserPermissions(payload);
    return data?.permissions || [];
  } catch (e) {
    throw new Error(e);
  }
}
async function savePermissions() {
  loading.value.save = true;
  try {
    const payload = {
      projectId: props.sub.project_id,
      userId: props.sub.id,
      payload: { permissions: tree.value },
    };
    await api.updatePermissions(payload);
  } catch (e) {
    throw new Error(e);
  } finally {
    loading.value.save = false;
  }
}
</script>

<style scoped>

</style>

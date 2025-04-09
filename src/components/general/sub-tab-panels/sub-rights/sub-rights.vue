<template>
  <app-page>
    <app-page-header :title="$t('page.sub.title.rights')">
    </app-page-header>
    <div>
      <q-tree
        v-if="showTree"
        v-model:ticked="model"
        :nodes="permissions"
        node-key="code"
        tick-strategy="leaf"
        default-expand-all
      >
        <template #default-header="{ node }">
          <span v-text="$t(node.title)" />
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

// Emits

// Variables
const api = useApi();

// Reactive variables
const model = ref(null);
const permissions = ref([]);

// Composition

// Computed
const showTree = computed(() => !!permissions.value.length);

// Watch

// Hooks
onBeforeMount(async () => {
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
</script>

<style scoped>

</style>

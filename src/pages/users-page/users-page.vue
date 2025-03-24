<template>
  <app-page>
    <app-page-header :title="$t('page.users.title')">
      <template #actions>
        <q-input
          v-model="search"
          outlined
          dense
          :placeholder="$t('field.placeholder.search')"
          class="users-search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          :label="$t('button.add_user')"
          color="primary"
          unelevated
          no-caps
          class="text-bold font-16"
          @click="showDialog"
        />
      </template>
    </app-page-header>

    <users-list :users="users" />

    <base-dialog
      v-model="dialogIsShow"
      :title="$t('page.users.add_user')"
    >
      <add-user-form @create:project="addProject" />
    </base-dialog>
  </app-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import useApi from 'src/api';
import BaseDialog from 'components/base/base-dialog/base-dialog';
import AppPage from 'components/app/app-page/app-page';
import AppPageHeader from 'components/app/app-page/app-page-header/app-page-header';
import AddUserForm from 'components/general/forms/add-user-form/add-user-form';
import UsersList from 'components/general/users-list/users-list';
import { useProjectStore } from 'src/stores';

// Props

// Emits

// Variables
const projectStore = useProjectStore();
const api = useApi();

// Reactive variables
const users = ref([]);
const search = ref('');
const dialogIsShow = ref(false);

// Composition

// Computed
const project = computed(() => projectStore.project);

// Watch

// Hooks
onMounted(async () => {
  users.value = await getUsers();
});
// Methods
function showDialog() {
  dialogIsShow.value = true;
}
function hideDialog() {
  dialogIsShow.value = false;
}
async function getUsers() {
  return [
    {
      createdAt: '2025-03-24T14:42:57.000Z',
      updatedAt: '2025-03-24T14:43:07.272Z',
      lastActiveAt: null,
      id: 23,
      userId: 1,
      projectId: 6,
      name: 'Artem Mikheev',
      email: 'artem.mikheev.git@gmail.com',
    },
  ];
  // eslint-disable-next-line no-unreachable
  try {
    const projectId = project.value.id;
    const { data } = await api.getUsers(projectId);
    return data;
  } catch (e) {}
}
function addProject(project) {
  hideDialog();
  users.value.push(project);
}
</script>

<style lang="scss" scoped>
.users-search {
  width: 100%;
  max-width: 800px;
}
</style>

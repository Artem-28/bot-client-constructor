<template>
  <app-page>
    <app-page-header :title="$t('page.subs.title')">
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

    <subs-list :subs="subs" @delete:sub="deleteSub" />

    <base-dialog
      v-model="dialogIsShow"
      :title="$t('page.subs.add_user')"
    >
      <subscribe-user-form @subscribe="addSub" />
    </base-dialog>
  </app-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import useApi from 'src/api';
import BaseDialog from 'components/base/base-dialog/base-dialog';
import AppPage from 'components/app/app-page/app-page';
import AppPageHeader from 'components/app/app-page/app-page-header/app-page-header';
import { useProjectStore } from 'src/stores';
import SubscribeUserForm from 'components/general/forms/subscribe-user-form/subscribe-user-form';
import SubsList from 'components/general/subs-list/subs-list';

// Props

// Emits

// Variables
const projectStore = useProjectStore();
const api = useApi();

// Reactive variables
const subs = ref([]);
const search = ref('');
const dialogIsShow = ref(false);

// Composition

// Computed
const project = computed(() => projectStore.project);

// Watch

// Hooks
onMounted(async () => {
  subs.value = await getSubs();
});
// Methods
function showDialog() {
  dialogIsShow.value = true;
}
function hideDialog() {
  dialogIsShow.value = false;
}
async function getSubs() {
  try {
    const projectId = project.value.id;
    const { data } = await api.getSubscribers(projectId);
    return data;
  } catch (e) {}
}
function addSub(sub) {
  hideDialog();
  subs.value.push(sub);
}
function deleteSub(sub) {
  subs.value = subs.value.filter(s => s.id !== sub.id);
}
</script>

<style lang="scss" scoped>
.users-search {
  width: 100%;
  max-width: 800px;
}
</style>

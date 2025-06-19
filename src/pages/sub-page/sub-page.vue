<template>
  <div class="sub-page">
    <q-tabs
      v-model="tab"
      dense
      vertical
      class="sub-page-tabs"
      active-color="primary"
    >
      <q-tab
        v-for="tab in subTabs"
        :key="tab.name"
        :name="tab.name"
        no-caps
        class="sub-page-tabs__tab text--md text--bold text-color--gray"
      >
        <span v-text="$t(tab.label)" />
      </q-tab>
    </q-tabs>
    <q-tab-panels v-if="sub" v-model="tab" class="sub-page-panels">
      <q-tab-panel :name="subTabs.info.name" class="q-pa-none">
        <sub-info />
      </q-tab-panel>

      <q-tab-panel :name="subTabs.rights.name" class="sub-page-panel">
        <sub-rights :sub="sub" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import subTabs from 'pages/sub-page/sub-tabs';
import { useQueryModel } from 'src/composable/use-query-model.composable';
import SubInfo from 'components/general/sub-tab-panels/sub-info/sub-info';
import SubRights from 'components/general/sub-tab-panels/sub-rights/sub-rights';
import useApi from 'src/api';
import { useRoute } from 'vue-router';
import { onBeforeMount, ref } from 'vue';

// Props

// Emits

// Variables
const api = useApi();
const route = useRoute();

// Reactive variables
const { model: tab } = useQueryModel('tab', subTabs.info.name);
const sub = ref(null);

// Composition

// Computed

// Watch

// Hooks
onBeforeMount(async () => {
  const { project_id, sub_id } = route.params;
  sub.value = await getSub(project_id, sub_id);
});

// Methods
async function getSub(projectId, subId) {
  try {
    const { data } = await api.getSubscriber({ projectId, subId });
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

</script>

<style lang="scss">
</style>
<style scoped lang="scss">
.sub-page {
  display: flex;
  height: 100%;
}
.sub-page-tabs {
  background-color: #FFFFFF;
  &__tab {
    width: 240px;
    justify-content: flex-start;
    padding: 12px 24px;
  }
}
.sub-page-panel {
  padding: 0;
  height: 100%;
}
.sub-page-panels {
  background-color: transparent;
  width: 100%;
}
</style>

<template>
  <app-page>
    <app-page-header :title="$t('page.projects.title')">
      <template #actions>
        <q-input
          v-model="search"
          outlined
          dense
          :placeholder="$t('field.placeholder.search')"
          class="projects-search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          :label="$t('button.create_project')"
          color="primary"
          unelevated
          no-caps
          class="text-bold font-16"
          @click="showDialog"
        />
      </template>
    </app-page-header>

    <div class="projects-grid">
      <project-card
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
    <base-dialog
      v-model="dialogIsShow"
      :title="$t('page.projects.create_project')"
    >
      <create-project-form @create:project="addProject" />
    </base-dialog>
  </app-page>
</template>

<script setup>
import ProjectCard from 'components/general/project-card/project-card';
import { onBeforeMount, ref } from 'vue';
import useApi from 'src/api';
import BaseDialog from 'components/base/base-dialog/base-dialog';
import CreateProjectForm from 'components/general/forms/create-project-form/create-project-form';
import AppPage from 'components/app/app-page/app-page';
import AppPageHeader from 'components/app/app-page/app-page-header/app-page-header';

// Props

// Emits

// Variables
const api = useApi();

// Reactive variables
const projects = ref([]);
const search = ref('');
const dialogIsShow = ref(false);

// Composition

// Computed

// Watch

// Hooks
onBeforeMount(async () => {
  projects.value = await getProjects();
});

// Methods
function showDialog() {
  dialogIsShow.value = true;
}
function hideDialog() {
  dialogIsShow.value = false;
}
async function getProjects() {
  try {
    const { data } = await api.getProjects();
    return data;
  } catch (e) {}
}
function addProject(project) {
  hideDialog();
  projects.value.push(project);
}
</script>

<style lang="scss" scoped>
.projects-search {
  width: 100%;
  max-width: 800px;
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  column-gap: 16px;
  row-gap: 24px;
}

@media (max-width: 2100px) {
  .projects-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}
@media (max-width: 1700px) {
  .projects-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (max-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .projects-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>

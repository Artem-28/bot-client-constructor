<template>
  <div class="projects-page">
    <div class="projects">
      <div class="projects-panel">
        <q-input
          v-model="search"
          outlined
          dense
          :placeholder="$t('field.placeholder.search')"
          class="projects-panel__search"
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
          class="projects-panel__btn text-bold"
          @click="showDialog"
        />
      </div>

      <span v-text="$t('page.projects.title')" class="font-24 text-bold" />

      <div class="projects-grid">
        <project-card
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
    <create-project-dialog
      v-model="dialogIsShow"
      @create:project="addProject"
    />
  </div>
</template>

<script setup>
import ProjectCard from 'components/general/project-card/project-card';
import { onBeforeMount, ref } from 'vue';
import CreateProjectDialog from 'components/general/create-project-dialog/create-project-dialog';
import useApi from 'src/api';

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
async function getProjects() {
  try {
    const { data } = await api.getProjects();
    return data;
  } catch (e) {}
}
function addProject(project) {
  projects.value.push(project);
}
</script>

<style lang="scss" scoped>
.projects-page {
  padding: 40px 32px;
}
.projects {
  height: 100%;
  width: 100%;
  padding: 24px 16px;
  background-color: $bg-primary;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 8px;
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  column-gap: 16px;
  row-gap: 24px;
}
.projects-panel {
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: space-between;
  &__search {
    width: 100%;
    max-width: 800px;
  }
  &__btn {
    height: 40px;
    min-width: fit-content;
  }
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

<template>
  <div class="main-page">
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
        />
      </div>

      <span v-text="$t('page.main.header')" class="font-24 text-bold" />

      <div class="projects-grid">
        <project-card
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProjectCard from 'components/project-card/project-card';
import { ref } from 'vue';

// Props

// Emits

// Variables
const projects = [
  { id: 1, title: 'project 1' },
  { id: 2, title: 'project 2' },
  { id: 3, title: 'project 3' },
  { id: 4, title: 'project 4' },
  { id: 5, title: 'project 5' },
  { id: 6, title: 'project 6' },
  { id: 7, title: 'project 7' },
  { id: 8, title: 'project 8' },
  { id: 9, title: 'project 9' },
  { id: 10, title: 'project 10' },
  { id: 11, title: 'project 11' },
  { id: 12, title: 'project 12' },
  { id: 13, title: 'project 13' },
];
// Reactive variables
const search = ref('');

// Composition

// Computed

// Watch

// Hooks

// Methods
</script>

<style lang="scss" scoped>
.main-page {
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

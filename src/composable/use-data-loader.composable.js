import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore, useScriptStore } from 'src/stores';
import useApi from 'src/api';

async function useDataLoader() {
  const api = useApi();
  const route = useRoute();

  const projectStore = useProjectStore();
  const scriptStore = useScriptStore();

  watch(route, async () => {
    const { project_id, script_id } = route.params;

    if (project_id) await getProject(+project_id);
    if (script_id) await getScript(+project_id, +script_id);
  });

  async function getProject(projectId) {
    if (projectStore.project && projectStore.project.id === projectId) return;

    try {
      const { data } = await api.getProject({ projectId });
      projectStore.updateProject(data);
    } catch (e) {}
  }

  async function getScript(projectId, scriptId) {
    if (scriptStore.script && scriptStore.script.id === scriptId) return;

    try {
      const { data } = await api.getScript({ projectId, scriptId });
      scriptStore.updateScript(data);
    } catch (e) {}
  }
}
export default useDataLoader;

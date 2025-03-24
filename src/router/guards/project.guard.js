import { useProjectStore } from 'src/stores';
import useApi from 'src/api';

async function projectGuard(to) {
  const api = useApi();
  const store = useProjectStore();
  const { project_id: projectId } = to.params;

  if (!projectId || projectId === store.project?.id) return;

  try {
    const { data } = await api.getProject(projectId);
    store.updateProject(data);
  } catch (e) {}
}

export default projectGuard;

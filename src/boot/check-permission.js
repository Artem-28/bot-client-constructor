import { usePermissionsStore } from 'stores/permissions.store';

export async function checkPermission(projectId, requiredPermission, operator = 'and') {
  const { permissions, getPermissions } = usePermissionsStore();

  if (!permissions[projectId]) await getPermissions(projectId);

  const userPermissions = permissions[projectId];
  if (!Array.isArray(requiredPermission)) return userPermissions.includes(requiredPermission);

  switch (operator) {
    case 'and':
      return requiredPermission.every(element => userPermissions.includes(element));
    case 'or':
      return requiredPermission.some(element => userPermissions.includes(element));
    default:
      return true;
  }
}

export default ({ app }) => {
  app.config.globalProperties.$checkPermission = (permission) => {
    return checkPermission();
  };
};

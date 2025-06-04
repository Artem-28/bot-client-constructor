async function permissionGuard(to) {
  const { meta } = to;
  if (!meta) return true;
  if (!Object.prototype.hasOwnProperty.call(meta, 'accessRoles')) return true;

  const { accessRoles } = meta;

  if (typeof accessRoles === 'function') {
    const { project_id } = to.params;
    return project_id ? accessRoles(project_id) : true;
  }

  return !!accessRoles;
}

export default permissionGuard;

const VuePermissions = {
  install(Vue, { store }) {
    Vue.prototype.$checkPermission = (role, operator = 'and', callback) => { // eslint-disable-line
      // TODO: Исопльзуем захардкоженные права доступа, убрать после заведения на серваке
      console.log('checkPermission');
      // eslint-disable-next-line no-constant-condition
      if (1) return;
      let { permissions } = store.state.auth;
      if (!permissions.size) {
        permissions = new Set(store.state.auth.accesses);
      }

      if (!permissions) return false;
      let canAccess = true;
      const formattedOperator = String(operator).toLowerCase();

      if (Array.isArray(role)) {
        canAccess = formattedOperator !== 'or';
        for (let i = 0; i < role.length; i += 1) {
          if (formattedOperator === 'or') {
            if (permissions.has(role[i])) {
              canAccess = true;
              break;
            }
          } else if (!permissions.has(role[i])) {
            canAccess = false;
            return false;
          }
        }
      } else {
        canAccess = permissions.has(role);
      }

      if (canAccess && callback && typeof callback === 'function') callback();
      return canAccess;
    };
  },
};

export default VuePermissions;

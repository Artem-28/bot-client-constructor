import {MenuItem} from 'src/types/component.type';
import {MenuItemNameEnum} from 'src/types/enum/menu-item-name.enum';
import {RouteLocationNormalizedLoaded} from 'vue-router';

export const menu: MenuItem[] = [
  {
    name: MenuItemNameEnum.PROJECTS,
    label: 'menu.item.projects',
    icon: 'manage_accounts',
    path: '/projects',
    visible: true
  },
  {
    name: MenuItemNameEnum.SCRIPTS,
    label: 'menu.item.scripts',
    icon: 'smart_toy',
    path: (router) => getPathItem(router, MenuItemNameEnum.SCRIPTS),
    visible: (router) =>  checkVisibleItem(router, MenuItemNameEnum.SCRIPTS),
  },
  {
    name: MenuItemNameEnum.MESSAGES,
    label: 'menu.item.messages',
    icon: 'email',
    path: (router) => getPathItem(router, MenuItemNameEnum.MESSAGES),
    visible: (router) =>  checkVisibleItem(router, MenuItemNameEnum.MESSAGES),
  }
];

const checkVisibleItem = (route: RouteLocationNormalizedLoaded, name: MenuItemNameEnum ) => {
  const parentRoute = route?.meta.parentRoute;
  if (typeof parentRoute !== 'string') return false;
  switch (name) {
    case MenuItemNameEnum.SCRIPTS:
    case MenuItemNameEnum.MESSAGES:
      return [MenuItemNameEnum.PROJECTS].includes(parentRoute as MenuItemNameEnum);
    default:
      return false;
  }
};

const getPathItem = (route: RouteLocationNormalizedLoaded, name: MenuItemNameEnum ) => {
  const { projectId } = route.params;
  switch (name) {
    case MenuItemNameEnum.SCRIPTS:
    case MenuItemNameEnum.MESSAGES:
      return `/projects/${projectId}/${name}`;
    default:
      return '/not-found';
  }
};

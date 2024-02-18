import {MenuItemNameEnum} from 'src/types/enum/menu-item-name.enum';
import {RouteLocationNormalizedLoaded} from 'vue-router';

export interface MenuItem {
  name: MenuItemNameEnum;
  label: string;
  icon: string;
  path: ((router: RouteLocationNormalizedLoaded) => string) | string;
  visible: ((router: RouteLocationNormalizedLoaded) => boolean) | boolean;
}


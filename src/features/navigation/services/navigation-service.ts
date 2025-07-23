import { NavigationItem, mainNavigation, footerNavigation } from '../data/navigation-data';

export class NavigationService {
  static getMainNavigation(): NavigationItem[] {
    return mainNavigation;
  }

  static getFooterNavigation() {
    return footerNavigation;
  }

  static getNavigationByPath(path: string): NavigationItem | null {
    return mainNavigation.find(item => item.href === path) || null;
  }

  static isActiveRoute(itemHref: string, currentPath: string): boolean {
    if (itemHref === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(itemHref);
  }
}
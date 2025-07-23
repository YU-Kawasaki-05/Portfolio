import { homePageData } from '../data/home-data';
import { HomePageData } from '../types/home-types';

export class HomeService {
  static getHomePageData(): HomePageData {
    return homePageData;
  }

  static getNavigationCards() {
    return homePageData.navigationCards;
  }

  static getHeroData() {
    return homePageData.hero;
  }
}
import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '' },

  { path: '/user-profile', title: 'Profil', icon: 'users_single-02', class: '' },

  { path: '/vigil', title: 'Vigils', icon: 'business_badge', class: '' },
  { path: '/restaurant', title: 'Restaurants', icon: 'business_bank', class: '' },
  { path: '/horaire', title: 'Horaires', icon: 'ui-1_calendar-60', class: '' },

  { path: '/parametres', title: 'Parametres', icon: 'ui-1_settings-gear-63', class: '' },





];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}

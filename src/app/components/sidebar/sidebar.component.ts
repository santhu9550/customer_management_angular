import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

  { path: '/app/customers', title: 'Customers',  icon:'person_outline', class: '' },
    { path: '/app/orders', title: 'Orders',  icon:'content_paste', class: '' },
    { path: '/app/profile', title: 'Profile',  icon:'account_circle', class: '' },
        { path: '/app/logout', title: 'LOGOUT',  icon:'logout', class: 'active-pro' },

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
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

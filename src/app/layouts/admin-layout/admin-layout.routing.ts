import { Routes } from '@angular/router';


import { OrdersPageComponent } from '../../orders-page/orders-page.component';
import { CustomersPageComponent } from '../../customers-page/customers-page.component';
import { LogoutComponent } from '../../logout/logout.component';
import { ProfilePageComponent } from '../../profile-page/profile-page.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'customers',          component: CustomersPageComponent },
      { path: 'orders',     component: OrdersPageComponent },
      { path: 'logout',     component: LogoutComponent },
      { path: 'profile',     component: ProfilePageComponent },
      { path: '**', redirectTo: 'customers' }


];

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {CustomersComponent} from '../../components/customers/customers.component';
import {NgconfPaginationModule} from 'ngconf-pagination';
import {MatIconModule} from '@angular/material/icon';
import { CustomersPageComponent } from '../../customers-page/customers-page.component';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import {MatDialogModule} from '@angular/material/dialog';

import { TableComponent } from '../../components/table/table.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsComponent } from '../../components/forms/forms.component';
import { NewOrderFormComponent } from '../../components/new-order-form/new-order-form.component';
import {OrdersPageComponent} from '../../orders-page/orders-page.component';
import { LogoutComponent } from '../../logout/logout.component';
import { ProfilePageComponent } from '../../profile-page/profile-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgconfPaginationModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule
  ],
  declarations: [
    NewOrderFormComponent,
    OrdersPageComponent,
  CustomersComponent,
   CustomersPageComponent,
   TableComponent,
   ProfileCardComponent,
   FormsComponent,
   LogoutComponent,
   ProfilePageComponent
  ]
})

export class AdminLayoutModule {}

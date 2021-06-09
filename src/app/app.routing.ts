import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from "./auth/auth.guard";
import { SigninComponent } from "./signin/signin.component";
const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: SigninComponent },
  {
    path: 'app',
    redirectTo: 'customers',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }, {
    path: 'app',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true,
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

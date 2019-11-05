import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AddEmpComponent } from './employee/addEmp.component';
import { AllEmpComponent } from './employee/allEmp.component';
import { EmpSearchComponent } from './employee/empSearch.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {  AuthGuard } from './login/authguard.services';
import {  DashboardComponent } from './dashboard/dashboard.component';



export const appRoutes: Routes = [
{ path: 'saveEmp', component: AddEmpComponent },
{ path: 'editEmp/:empId', component: AddEmpComponent },
{ path: 'allEmp', component: AllEmpComponent,canActivate:[AuthGuard] },
{ path: 'searchEmp', component: EmpSearchComponent },
{ path: 'login', component: LoginComponent },
{ path:'dashboard' ,component:DashboardComponent,canActivate:[AuthGuard]},
{ path: 'logout', component: LogoutComponent},
{ path: '', component: LoginComponent },
{ path: '**', component: LoginComponent },



];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
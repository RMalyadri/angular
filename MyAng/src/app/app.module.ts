import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AddEmpComponent } from './employee/addEmp.component';
import { AllEmpComponent } from './employee/allEmp.component';
import { EmpFilterComponent } from './employee/empFilter.component';
import {  EmpSearchComponent } from './employee/empSearch.component';
import { LoginComponent} from './login/login.component';
import {  AuthGuard } from './login/authguard.services';
import {  DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { EmployeeSearchFilter  } from './employee/search.pipe';
import { CustomChangeDriective } from './practise/customChangeDirective';
import {  AppRouting } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';


@NgModule({
  declarations: [
    AppComponent,AddEmpComponent,AllEmpComponent,EmpFilterComponent,EmpSearchComponent,LoginComponent,
    DashboardComponent,LogoutComponent,EmployeeSearchFilter,CustomChangeDriective,ConfirmationDialogComponent

  ],
  imports: [
    BrowserModule,AppRouting,FormsModule,ReactiveFormsModule,HttpClientModule,NgbModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthGuard,ConfirmationDialogService],
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }

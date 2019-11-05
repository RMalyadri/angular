import {Component}  from '@angular/core';
import { AppComponent} from "../app.component";

@Component({
   selector:'dashboard',
   templateUrl:'./dashboard.component.html',
   styleUrls: ['./dashboard.component.css'],
   providers:[]

})

export class DashboardComponent {
    loginMes:string = 'You are logged in succussfully';
    constructor(private appComponent:AppComponent) {
        this.appComponent.disableEmpList();
    }
}
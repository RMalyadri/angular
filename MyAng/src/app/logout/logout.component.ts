import {Component,OnInit}  from '@angular/core';
import { AuthGuard}  from '../login/authguard.services';
import { AppComponent} from "../app.component";
import { Router } from '@angular/router';

@Component({
    selector:'logout-menu',
    templateUrl:'./logout.component.html',
    
  })
  
  export class LogoutComponent implements OnInit {
    logoutMsg:string='Logout successfully';
    constructor(private router:Router,private _authService: AuthGuard,private appComponent:AppComponent) {
             
    }
  
    ngOnInit() {
      localStorage.removeItem("token");
      this.appComponent.disableEmpList();
      this.router.navigate(["/login"]);
    }
  
  }
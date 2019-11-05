import {Component}  from '@angular/core';
import { ILogin,ILoginResponse,LoginAuthResponse}  from './login.consts';
import { LoginPostService } from './login.services';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
   selector:'login',
   templateUrl:'./login.component.html',
   styleUrls: ['./login.component.css'],
   providers:[LoginPostService]

})

export class LoginComponent {
    
    private loginAuthResponse:LoginAuthResponse;
    private loginDet:ILogin={
        userId:'',
        password:'',
    };
    private errorResponse:ILoginResponse;
    private onlyLoginPage:boolean=true;
  

    constructor(private postService:LoginPostService,private router: Router) {
          if(localStorage.getItem("token") != null) {
            this.router.navigate(["/dashboard"],);
          }  
    }
     private login(loginForm: NgForm) {
       
        this.postService.signIn(loginForm.value).subscribe( data => {
            localStorage.setItem("currentUser",`${loginForm.value.userId}`);
            this.loginAuthResponse=data;
            this.router.navigate(["/dashboard"],);
            localStorage.setItem("token",this.loginAuthResponse.accessToken);
        },
        err => {
           this.errorResponse = err;
           loginForm.form.reset();
           console.log("error from component:"+JSON.stringify(this.errorResponse));                      
        });
    }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin,LoginAuthResponse,ILoginResponse,errorInfo}  from './login.consts';
import { AppConstants } from '../employee/emp.constant';
import { catchError } from 'rxjs/operators'
import { Observable,throwError}  from  'rxjs'

@Injectable()
export class LoginPostService {
   
    constructor(private httpClient: HttpClient) {

    }
    public signIn(loginDet:ILogin):Observable<LoginAuthResponse> {
       // console.log("user name from login page:"+loginDet.userId);
        return this.httpClient.post<LoginAuthResponse>(AppConstants.APP_URL+"/auth/signin",loginDet)
        .pipe(catchError(this.handleError));
    }

    handleError(error) {
        let errorInfoDet:ILoginResponse={
             error:{
                message:'Server is down.. Please wait awhile',
                status:101, 
             }
        }
     if (error.error instanceof ErrorEvent) {
        console.log("error from http client "+error.error+" msg"+ `Error: ${error.error.message}`);
     } else {
        if(error.status == 0 ) {
            error = errorInfoDet;
        }
     }
     return throwError(error); 
    }
    
}
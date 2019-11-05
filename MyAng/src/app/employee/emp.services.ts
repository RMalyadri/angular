import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IEmpInfo,AppConstants,IResponseInfo } from './emp.constant';
import { Observable}  from  'rxjs'



@Injectable()
export class EmpPostService {
   
    constructor(private httpClient: HttpClient) {

    }

    private createHeaer() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token") 
        })
      };
      return httpOptions;
    }
    public createEmp(emp: IEmpInfo):Observable<IResponseInfo>{
        console.log("token value:"+localStorage.getItem("token"));
         
       return this.httpClient.post<IResponseInfo>(AppConstants.APP_URL+"/dash/saveEmp",emp,this.createHeaer());
    }

    public getAllEmployes(page:number):Observable<any>{
       return this.httpClient.get<any>(AppConstants.APP_URL+"/dash/all?page="+page+"&size="+AppConstants.PAGINATION_ROW_SIZE,this.createHeaer());  
    }

    public searchEmployes(searchKey:string):Observable<IEmpInfo[]> {
        return this.httpClient.get<IEmpInfo[]>(AppConstants.APP_URL+"/dash/searchEmp/"+`${searchKey}`,this.createHeaer());  
    }

    public deleteEmployee(empIds:string[]):Observable<IResponseInfo> {
       return this.httpClient.post<IResponseInfo>(AppConstants.APP_URL+"/dash/deleteEmp/"+`${empIds}`,null,this.createHeaer());  
  }

  public editEmployee(empId:number):Observable<IEmpInfo> {
      return this.httpClient.post<IEmpInfo>(AppConstants.APP_URL+"/dash/editEmp/"+`${empId}`,null,this.createHeaer());  
  }
}
import { Pipe,PipeTransform } from '@angular/core';
import { IEmpInfo } from './emp.constant';

@Pipe({
 name:'employeeSearchFilter'    
})

export class EmployeeSearchFilter implements PipeTransform {
    transform(employesList:IEmpInfo[],search?:any):any {
       if(search === undefined) {
         return employesList;    
       }
       return employesList.filter((employee:IEmpInfo) => {
         console.log("filter value"+employee.eid+" and "+search);
         return (+employee.eid == +search) || (employee.firstName.toLowerCase().includes(search.toLowerCase())) ||
         (employee.lastName.toLowerCase().includes(search.toLowerCase())) ||
         (employee.gender.toLowerCase().includes(search.toLowerCase())) ;
        
       });
    }
}
import { Component,Output,EventEmitter } from '@angular/core';
import { IEmpInfo } from './emp.constant';
import { EmpPostService } from './emp.services';
import { NgForm} from '@angular/forms';


@Component({
  selector:'emp-search',
  templateUrl:'./empSearch.component.html',
  providers:[EmpPostService]
  
})

export class EmpSearchComponent {

  private searchKey:string;
  private isSearched:boolean=false;
  @Output()
  private seachValueChanged:EventEmitter<String> = new EventEmitter<String>(); 
 
  constructor(private empPostSevice:EmpPostService) {

  }
  
  private empSearch( searchForm:NgForm) {
    this.isSearched=true;
    /* this.empPostSevice.searchEmployes(this.searchKey).subscribe( data => {
      this.employeeList=data;
    }); */
    if(searchForm.valid) {
      this.seachValueChanged.emit(this.searchKey);   
    }
    
      
 }
 

}
import { Component, OnInit } from '@angular/core';
import { EmpPostService } from './emp.services';
import { IEmpInfo, IResponseInfo,AppConstants } from './emp.constant';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';



@Component({
    selector: 'all-emp',
    templateUrl: './allEmp.component.html',
    styleUrls: ['./emp.component.css'],
    providers: [EmpPostService]
})

export class AllEmpComponent implements OnInit {

    private employeeList: IEmpInfo[];
    private serverResponse: IResponseInfo;
    private statusMessage: string;
    private selectEmpIds: string[] = []
    private checkedValue: boolean = false;
    private topCheckedValue: boolean = false;
    private paginationDisable:string;
    private totalPages:number[]=[];
    private page:number=0;
    private nextPageIndex:number;
    private previousPageIndex:number;
    private nextButtonDisable:string="page-item";
    private prevButtonDisable:string="page-item";
    private totalElements:number;
    
      
    constructor(private confirmationDialogService: ConfirmationDialogService,private spinnerService: Ng4LoadingSpinnerService, private empPostSevice: EmpPostService, private router: Router) {
    }

    ngOnInit() {
        this.spinnerService.show()
        console.log("page offset"+this.page);
        this.employeeListDetails(this.page);
    }

    private employeeListDetails(page:number) {
        this.empPostSevice.getAllEmployes(page).subscribe(
            data => {
               // console.log("pagination data"+JSON.stringify(data));
                this.employeeList = data['content'];
                //this.totalPages=new Array(data['totalPages']);
                //console.log("total pages:"+data['totalPages']);
                //console.log("total pageNumber:"+data['pageable']['pageNumber']);
                console.log("pagination response:"+JSON.stringify(data));
                if(data['first']) {
                    this.prevButtonDisable="page-item disabled"; 
                }else {
                    this.prevButtonDisable="page-item"; 
                }
                if(data['last']) {
                    this.nextButtonDisable="page-item disabled"; 
                }else {
                    this.nextButtonDisable="page-item"; 
                }
                this.totalElements=data['totalElements'];
                this.setPaginationSegment(+data['pageable']['pageNumber'],+data['totalPages'])
                this.spinnerService.hide();
            },
            err => {
                this.spinnerService.hide();
            });
    }
    setPaginationPageIndex(i:number,event:any) {
        event.preventDefault()
        this.page=i;
        this.employeeListDetails(this.page);
     }
    private setPaginationSegment(pageNumber: number, totalPaginationPages: number) {
        var min=0;
        var max=0;
        this.totalPages=[];
        totalPaginationPages=totalPaginationPages-1;
        for (var i = 0; i <= totalPaginationPages; i = i + AppConstants.PAGINATION_INDEX_SIZE) {
            min = i;
            max = i + AppConstants.PAGINATION_INDEX_SIZE - 1;
            if (max > totalPaginationPages) {
                max = totalPaginationPages;
                break;
            }
            if (pageNumber >= min && pageNumber <= max) {
                break;
            }
        }
        this.nextPageIndex=max;
        this.previousPageIndex=min;
        for (let i = min; i <= max; i++) {
            this.totalPages.push(i);
        }
        if(max == totalPaginationPages ) {
            this.nextButtonDisable="page-item disabled";
        }
        if(min == 0 ) {
            this.prevButtonDisable="page-item disabled";
        }
        
       
    }   
    nextPagination() {
        this.page=this.nextPageIndex+1;
        this.employeeListDetails(this.nextPageIndex+1);
    } 
    prevPagination() {
        let prevInd = this.previousPageIndex-AppConstants.PAGINATION_INDEX_SIZE;
        this.page=prevInd;
        this.employeeListDetails(prevInd);
        console.log("previous value"+prevInd);
        if(prevInd == 0) {
            this.prevButtonDisable="page-item disabled";
        }
        
    } 

    private getEmployeeCount(): number {
        return this.employeeList ? this.employeeList.length : 0;
    }

    private getMaleEmployeeCount(): number {
        return this.employeeList ? this.employeeList.filter(emp => emp.gender == 'M').length : 0;
    }

    private getFemaleEmployeeCount(): number {
        return this.employeeList ? this.employeeList.filter(emp => emp.gender == 'F').length : 0;
    }

    filterValueFromChild(value: string) {

        this.empPostSevice.getAllEmployes(this.page).subscribe(data => {
            if (value == "M") {
                this.employeeList = data['content'].filter(emp => emp.gender == 'M');
            } else if (value == "F") {
                this.employeeList = data['content'].filter(emp => emp.gender == 'F');
            } else {
                this.employeeList = data['content'];
            }

        },
        err => {

        });

    }

    searchEmployeeList(searchKey: string) {
        this.spinnerService.show();
        this.empPostSevice.searchEmployes(searchKey).subscribe(data => {
            this.employeeList = data;
            console.log("search employeeList:" + this.employeeList);
            this.spinnerService.hide();
        });
    }

    updateCheckedOptions(event) {
        if (event.target.checked) {
            this.selectEmpIds.push(event.target.value);
            this.statusMessage = "";
        } else {
           
            for (var i = 0; i < this.selectEmpIds.length; i++) {
                if (this.selectEmpIds[i] == event.target.value) {
                    this.selectEmpIds.splice(i, 1);
                }
            }
        }
        if (this.employeeList.length == this.selectEmpIds.length) {
            this.topCheckedValue = true;
        }else {
            this.topCheckedValue = false;
        }
    }
    deleteEmp() {
        if (this.selectEmpIds.length == 0) {
            this.statusMessage = "Please select atlease one employee record to delete"
        } else {
            this.confirmationDialogService.confirm('Confirmation', 'Do you want to delete the employee\'s')
                .then((confirmed) => {
                    if (confirmed) {
                        this.empPostSevice.deleteEmployee(this.selectEmpIds).subscribe(
                            res => {
                                this.serverResponse = res;
                                console.log("response status" + this.serverResponse.status);
                               // console.log("delete pages details"+);
                                let remRows =  - this.selectEmpIds.length
                                if (this.serverResponse.status) {
                                    this.checkedValue=false;
                                    this.topCheckedValue=false;
                                    let remRows = (this.totalElements-this.selectEmpIds.length) % AppConstants.PAGINATION_ROW_SIZE;
                                    if(remRows==0) {
                                       this.page=this.page-1;
                                       if(this.page < 0) {
                                          this.page=0;
                                       }
                                    }
                                    this.selectEmpIds=[];
                                    this.ngOnInit();
                                    this.router.navigate(["/allEmp"]);
                                } else {
                                    console.log("error Message:" + this.serverResponse.message);
                                    this.statusMessage = this.serverResponse.message;
                                }
                            },
                            error => {
                                this.statusMessage = 'Please try after some time';
                                console.log(error);
                            }
                        );
                    }
                })
                .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
        }
    }

    selectAllForDelete(event) {
        if (event.target.checked) {
            this.statusMessage = '';
            this.checkedValue = event.target.checked
            this.employeeList.forEach(emp => this.selectEmpIds.push(emp.eid));
        } else {
            console.log("delere recode checked value"+this.checkedValue);
            this.checkedValue = event.target.checked;
            this.selectEmpIds = [];
        }

    }
    editEmployee(empId:Number) {
        this.router.navigate(["/editEmp",empId])
    }
}

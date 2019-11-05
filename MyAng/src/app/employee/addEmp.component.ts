import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEmpInfo, genders, IResponseInfo } from './emp.constant';
import { EmpPostService } from './emp.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';




@Component({
  selector: 'add-emp',
  templateUrl: './addEmp.component.html',
  styleUrls: ['./emp.component.css'],
  providers: [EmpPostService]
})
export class AddEmpComponent implements OnInit {
  private regFrom: FormGroup;
  private maxLengthValue: number = 19;
  private minLengthValue: number = 4;
  private empGender = genders;
  private serverResponse: IResponseInfo;
  private statusMessage: string = '';
  private twoWay: string;
  private existingEid: number;

  private buttonName: string;
  private isEidVisible: boolean;
  private hideForm: boolean = true;
  private clearBtnHide:boolean;
  private cancelBtnHide:boolean;

  constructor(private confirmationDialogService: ConfirmationDialogService, private spinnerService: Ng4LoadingSpinnerService, private _routeService: ActivatedRoute, private fb: FormBuilder, private empPostService: EmpPostService, private router: Router) {
  }
  ngOnInit() {
    this.cancelBtnHide=false;
    this.clearBtnHide=true;
    this.hideForm = true;
    this.isEidVisible = false;
    this.buttonName = "Add";
    this.regFrom = this.fb.group({
      eid: '',
      firstName: ['', [Validators.required, Validators.maxLength(this.maxLengthValue), Validators.minLength(this.minLengthValue)]],
      lastName: ['', Validators.required],
      //gender:[this.empGender[0].value,Validators.required]
      gender: [null, Validators.required]
    });
    this._routeService.paramMap.subscribe(params => {
      const existingEid = +params.get('empId');
      if (existingEid) {
        this.cancelBtnHide=true;
        this.clearBtnHide=false;
        this.buttonName = "Edit";
        this.isEidVisible = true;
        this.getEmplyee(existingEid);
      }
    });
  }

  private getEmplyee(empId: number) {
    this.empPostService.editEmployee(empId).subscribe(
      (existEmp: IEmpInfo) => {
        this.editFormData(existEmp);
      },
      error => {
        this.hideForm = false;
        this.statusMessage = 'Empleyee record is not found.Please refresh screen!';
        console.log(error);
      }
    );
  }

  private editFormData(editEmpInfo: IEmpInfo):void {
    
    this.regFrom.patchValue({
      eid: editEmpInfo.eid,
      firstName: editEmpInfo.firstName,
      lastName: editEmpInfo.lastName,
      gender: editEmpInfo.gender,
    });
  }

  private submitForm(empValue: IEmpInfo) {
     
    this.confirmationDialogService.confirm('Confirmation', 'Do you want to save the employee')
      .then((confirmed) => {
        if (confirmed) {
          this.spinnerService.show();
          this.empPostService.createEmp(empValue).subscribe(
            res => {
              this.spinnerService.show();
              this.serverResponse = res;
              if (this.serverResponse.status) {
                this.spinnerService.show();
                this.router.navigate(["/allEmp"]);
              } else {
                console.log("error Message:" + this.serverResponse.message);
                this.statusMessage = this.serverResponse.message;
              }
            },
            error => {
              this.statusMessage = 'Please try after some time';
              console.log(error);
              this.spinnerService.hide();

            }
          );
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}


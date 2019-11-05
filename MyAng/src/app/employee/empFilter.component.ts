import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
 selector:'emp-filter',
 templateUrl:'./empFilter.component.html'

})

export class EmpFilterComponent {
    @Input()
    private allCount:number;
    @Input()
    private maleCount:number;
    @Input()
    private femaleCount:number;

    filterValue:string='all';
    @Output()
    private filterValueChange:EventEmitter<String> = new EventEmitter<String>();

    private onFilterValueChange() {
      this.filterValueChange.emit(this.filterValue);   
    }
    
}
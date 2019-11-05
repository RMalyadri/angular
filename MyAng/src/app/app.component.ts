import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {

  private showMenu: boolean;
  private title: string;
  constructor() {
    this.title = "this is custom directive example";

  }

  public disableEmpList() {
    if (localStorage.getItem("token") != null) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }

  get userName(): string {
    return localStorage.getItem('currentUser');
  }
 
}

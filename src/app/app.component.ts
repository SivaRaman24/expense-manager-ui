import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'expense-manager-ui';

  ngOnInit() {
    // console.log('AppComponent');
  }

  // ngDoCheck() {
  //   console.log('App Component - doCheck');
  // }
}

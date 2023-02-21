import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  forgotpass(){
    alert();
  }

}

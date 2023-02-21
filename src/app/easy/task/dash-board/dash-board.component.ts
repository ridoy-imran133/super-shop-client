import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(private _UserService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  gettest(){
    this._UserService.commonGet('api/Values/test')
      .subscribe(
        response => {
        },
        error => {

        },
        () => {
          // No errors, route to new page
        }
      );
  }

}

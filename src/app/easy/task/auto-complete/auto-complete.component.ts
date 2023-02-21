import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserModel } from '../../models/UserModel';
import { UserService } from '../../services/user.service';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'ngx-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  options: string[];
  filteredOptions$: Observable<string[]>;
  public _Users: UserModel[];
  test: [];

  @ViewChild('autoInput') input;

  constructor(private _UserService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    alert($event)
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  getAllUsers() {
    this._UserService.commonGet('Task/getUsers')
      .subscribe(
        response => {
          this.options = [];
          this._Users = JSON.parse(JSON.stringify(response));
          this._Users.forEach((data) => {
            this.options.push(data.Name + "(" + data.Status + ")");
           });
          this.filteredOptions$ = of(this.options);
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { TestTable } from '../../models/TestTable';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-add-try-one',
  templateUrl: './add-try-one.component.html',
  styleUrls: ['./add-try-one.component.scss']
})
export class AddTryOneComponent implements OnInit {

  public masterForm: FormGroup;
  public _test: TestTable;
  _title: string = "Add";
  constructor(private _UserService: UserService, private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService) {
    this._test = new TestTable();
   }

   fromCreate() {
    this.masterForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Value: ['', Validators.required],

    });
  }

  get fval() {
    return this.masterForm.controls;
  }

  ngOnInit(): void {
    this.fromCreate();
  }

  onSaveUser() {

    if (this.masterForm.invalid) {
      return;
    }

    const busData = {
      BusinessData: this._test
    }


    this._UserService.commonPost('Task/SaveTestTable' ,busData)
      .subscribe(
        response => {
          this._influxToastaService.showToast('success', 'Response', response.toString());
          //this.router.navigate(['/easy/task/user-demo']);
        },
        error => {

        },
        () => {
          // No errors, route to new page
        }
      );
  }

}

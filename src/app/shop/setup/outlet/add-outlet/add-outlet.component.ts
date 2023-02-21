import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutletModel } from '../../../../shared/models/shop/OutletModel';
import { CommonApiConnectService } from '../../../../shared/_services/common-api-connect.service';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { OutletComponent } from '../outlet.component';

@Component({
  selector: 'ngx-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss']
})
export class AddOutletComponent implements OnInit, OnChanges {
  @Input() _outletFromOther: OutletModel;
  @Input() textfromother: string;
  @Input() textval: string;
  public masterForm: FormGroup;
  submitted= false;
  public outlet : OutletModel;
  status: boolean;
  constructor(private formBuilder: FormBuilder, private outletcomponent: OutletComponent,
              private _CommonService: CommonApiConnectService, private _influxToastaService: InfluxToastaService) { 
    this.outlet = new OutletModel();
  }

  ngOnInit(): void {
    this.fromCreate();
  }

  ngOnChanges() {
    if(this.textfromother == 'block'){
      this.outlet = this._outletFromOther;
      this.textfromother = 'none';
    }
  }
  
  fromCreate() {
    this.masterForm = this.formBuilder.group({
      outlet_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  dismissfornone(){
    this.submitted = false;
    this.outletcomponent.closePopupfornone();
  }

  dismiss(pOutlet: OutletModel, addedit: string){
    this.submitted = false;
    this.outlet = new OutletModel();
    this.outletcomponent.closePopup(pOutlet, addedit);
  }

  onSaveOutlet(){
    this.submitted = true;
    if (this.masterForm.invalid) {
    return;
    }
    this._CommonService.commonPost('Outlet/save', this.outlet)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response)).response;
        if(val.ResponseCode === '2000'){
          this.dismiss(val.ResponseData, this.textval);
          this._influxToastaService.showToast('success', 'Response', val.ResponseMessage);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', val.ResponseMessage);
        }
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );
  }
}

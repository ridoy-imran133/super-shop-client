import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { Branch } from '../../../models/Branch';
import { CustomerUBS } from '../../../models/CustomerUBS';
import { Rm } from '../../../models/Rm';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { GenerateRequestComponent } from '../generate-request.component';

@Component({
  selector: 'ngx-update-rm',
  templateUrl: './update-rm.component.html',
  styleUrls: ['./update-rm.component.scss']
})
export class UpdateRmComponent implements OnInit, OnChanges {
  @Input() _customerfromgenerateRequest: CustomerUBS;
  _customer: CustomerUBS;
  roleid: string = this._sessionService.getRole();
  branchcode: string = this._sessionService.getBranch();
  userid: string = this._sessionService.getUser();
  _rm: Rm[];
  _rmdetails: Rm;
  prioritycode: string;
  isbranchopen: boolean = false;
  _branch: Branch[];
  branch_code: string;
  constructor(private _CommonService: CommonService, private generaterequest: GenerateRequestComponent,
    private formBuilder: FormBuilder, private _influxToastaService: InfluxToastaService,
    private _sessionService: SessionService) { 
      this._rmdetails = new Rm();
      this._customer = new CustomerUBS();
    }

  ngOnInit(): void {
    if(this.roleid == 'R001'){
      this.isbranchopen = true;
      this.getAllBranch();
    }
    else{
      this.getBranchWiseRM();
    }
  }
  ngOnChanges() {
    this._customer = this._customerfromgenerateRequest;   
    //this.getBranchWiseRM(); 
  }

  getBranchWiseRM() {
    this._CommonService.commonGet('ServiceRequest/getAllRM?branchcode=' + this.branchcode + "&&userid=" + this.userid)
      .subscribe(
        response => {
          this._rm = JSON.parse(JSON.stringify(response)).rm;
          this._rm.forEach(x => {
            if(x.priority_code === this._customer.priority_code){
              this._rmdetails = x;
            }
          })
        },
        error => {
        },
        () => {
        },
      );
  }

  savepriority(){
    if(this._customer.priority_code == null || this._customer.priority_code == "" ){
      return;
    }
    if(this._customer.priority_code.trim)
    this._CommonService.commonPost('ServiceRequest/updateCustomer/'+ this._sessionService.getUser() ,this._customer)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.dismiss();
          this._influxToastaService.showToast('success', 'Response', val.status_message);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', "Failed");
        }
      },
      error => {
      },
      () => {
        // No errors, route to new page
      }
    );
  }

  dismiss() {
    this.generaterequest.closePopupforUpdateRm();
  }

  getAllBranch(){
    this._CommonService.commonGet('ServiceRequest/getAllBranch?userid='+this._sessionService.getUser())
    .subscribe(
      response => {
        this._branch = JSON.parse(JSON.stringify(response)).branches;
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }
  branchselect(){
    this._customer.priority_code = null;
    this.branchcode = this.branch_code;
    this.getBranchWiseRM();
  }
}

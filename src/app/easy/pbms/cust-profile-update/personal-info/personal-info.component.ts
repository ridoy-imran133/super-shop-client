import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { VasService } from '../../../models/VasService';
import { Vendor } from '../../../models/Vendor';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'ngx-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  public masterForm: FormGroup;
  public _vendor: Vendor;
  town_vendor: boolean;
  tstatus: boolean;
  isupdate: boolean=false;
  public _vasServices: VasService[];


  constructor(private router: Router,    
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private _influxToastaService: InfluxToastaService, private _CommonService: CommonService,private _sessionService: SessionService) { 
      this._vendor = new Vendor();
    }

  ngOnInit(): void {
    this.fromCreate();    
    this.getAllVasService();
  }
  onSaveVendor(){
    this._vendor.own_vendor = this.town_vendor == true ? "Y": "N";
    this._vendor.status = this.tstatus == true ? "Y": "N";
    this._vendor.userid = sessionStorage.getItem("userId");

    this._CommonService.commonPost('ServiceRequest/saveVendor/' + this._sessionService.getUser() ,this._vendor)
    .subscribe(
      response => {
        this._influxToastaService.showToast('success', 'Response', response.toString());
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      vendor_code: ['', [Validators.required]],
      vendor_name: ['', [Validators.required]],
      vas_code: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      contact_person_mobile: ['', [Validators.required]],
      loaction_code: ['', ],
      own_vendor: ['', ],
      status: ['', ],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  getAllVasService(){
    this._CommonService.commonGet('ServiceRequest/getAllVasService/'+ this._sessionService.getUser())
    .subscribe(
      response => {
        this._vasServices = JSON.parse(JSON.stringify(response)).vasService;        
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

}

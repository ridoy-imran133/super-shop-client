import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { InfluxToastaService } from '../../../../shared/_services/influx.toast.service';
import { VasService } from '../../../models/VasService';
import { Vendor } from '../../../models/Vendor';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';
import { VendorComponent } from '../vendor.component';

@Component({
  selector: 'ngx-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit, OnChanges {
  // @Input() text: string;
  // @Input() vendor: Vendor;
  public masterForm: FormGroup;
  public _vendor: Vendor;
  @Input() _venFromOther: Vendor;
  town_vendor: boolean;
  tstatus: boolean;
  isupdate: boolean=false;
  submitted: boolean=false;
  public _vasServices: VasService[];
  
  constructor(private router: Router, private vendorcomponent: VendorComponent,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private _influxToastaService: InfluxToastaService, private _CommonService: CommonService , private _sessionService: SessionService) { 
      this._vendor = new Vendor();
    }

  ngOnInit(): void {
    this.fromCreate();    
    this.getAllVasService();
  }
  ngOnChanges() {
    this.town_vendor = null;
    this.tstatus = null;
    this._vendor = this._venFromOther;
    this.submitted = false;
    this.town_vendor = this._vendor.own_vendor == 'Y' ? true : false;
    this.tstatus = this._vendor.status == 'Y' ? true : false;
    //alert(this._vendor.vendor_code);
  }
  onSaveVendor(){
    this.submitted = true;
    if (this.masterForm.invalid) {
      return;
    }
    this._vendor.own_vendor = this.town_vendor == true ? "Y": "N";
    this._vendor.status = this.tstatus == true ? "Y": "N";

    this._CommonService.commonPost('ServiceRequest/saveVendor/' + this._sessionService.getUser() ,this._vendor)
    .subscribe(
      response => {
        //this._influxToastaService.showToast('success', 'Response', response.toString());
        var val = JSON.parse(JSON.stringify(response));
        if(val.status_code === '40999'){
          this.dismiss();
          this._influxToastaService.showToast('success', 'Response', val.status_message);
        }
        else{
          this._influxToastaService.showToast('danger', 'Response', val.status_message);
        }
      },
      error => {

      },
      () => {
        // No errors, route to new page
      }
    );
  }
  editVendor(){
    //this._vendor = this.vendor;
    this.town_vendor = this._vendor.own_vendor == "Y" ? true: false;
    this.tstatus = this._vendor.status == "Y" ? true: false;
    this.masterForm.controls['vendor_code'].disable();
  }
  dismiss() {
    //this.ref.close(this._vendor);
    this.town_vendor = null;
    this.tstatus = null;
    var passval = this._vendor;
    this._vendor = new Vendor();
    this.vendorcomponent.closePopup(passval);
  }

  dismissfornone(){
    this.town_vendor = null;
    this.tstatus = null;
    this.vendorcomponent.closePopupfornone();
  }

  fromCreate() {
    this.masterForm = this.formBuilder.group({
      vendor_code: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
      vendor_name: ['', [Validators.required]],
      vas_code: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      //contact_person_mobile: ['', [Validators.required]],      
      contact_person_mobile: ['', [ Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]],
      loaction_code: ['', ],
      own_vendor: ['', ],
      status: ['', ],
    });
  }
  get fval() {
    return this.masterForm.controls;
  }

  getAllVasService(){
    this._CommonService.commonGet('ServiceRequest/getAllVasService/'+ this._sessionService.getUser() )
    .subscribe(
      response => {
        this._vasServices = JSON.parse(JSON.stringify(response)).vasService;   
             
        //this.text === "Add" ? '' : this.editVendor();
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }
  displayStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
    this.dismiss();
  }

}

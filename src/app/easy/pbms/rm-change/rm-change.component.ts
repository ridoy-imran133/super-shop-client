import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerUBS } from '../../models/CustomerUBS';
import { Rm } from '../../models/Rm';
import { CommonService } from '../../services/common.service';
import { SessionService } from '../../services/session.service';
import { RmUpdateComponent } from './rm-update/rm-update.component';

@Component({
  selector: 'ngx-rm-change',
  templateUrl: './rm-change.component.html',
  styleUrls: ['./rm-change.component.scss']
})
export class RmChangeComponent implements OnInit {
  
  defaultRowPerPage = 10;
  isbirthday: boolean = false;
  roleid: string = this._sessionService.getRole();
  branchcode: string = this._sessionService.getBranch();
  userid: string = this._sessionService.getUser();
  public selectedrows: Array<CustomerUBS> = [];
  public _customers: CustomerUBS[];
  source: LocalDataSource = new LocalDataSource();
  _rm: Rm[];
  _prioritycodeold: string;
  _prioritycodenew: string;
  rmpass: Rm;

  ismodalopen: boolean = false;

  constructor(private _CommonService: CommonService, private formBuilder: FormBuilder, private _sessionService: SessionService) { }

  ngOnInit(): void {
    this.getBranchWiseRM();
    this.rmpass = new Rm();
    //this.getAllCustomers(this.userid, this.roleid, this.branchcode, "", "", "");
  }

  settings = {

    actions: {
      columnTitle: 'Service',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'transfer',
          title: '<span class= "retry">Transfer</span>',
        }
      ],
      position: 'right',
    },

    columns: {
      // e_mail:{
      //   type: 'custom',
      //   valuePrepareFunction: (cell, row) => row,
      //   renderComponent: CheckBoxComponent,
      // },
      // c: {
      //   title: '',
      //   type: 'html',
      //   valuePrepareFunction: (value) => { return this._sanitizer.bypassSecurityTrustHtml(this.input); },
      //   filter: false
      // },
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.source.getPaging();
          const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

          return ret;
        },
      },
      emp_id: {
        title: 'Employee ID',
        type: 'string',
        show: false
      },
      emp_name: {
        title: 'Employee Name',
        type: 'string',
      },
      rm_code: {
        title: 'RM Code',
        type: 'string',
      },
      branch_name: {
        title: 'Branch',
        type: 'string',
      }
    },
    selectMode: "single",
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
  };
  onSearch(query: string = '') {
    if (query.trim().length > 0){
      this.source.setFilter([
        {
          field: 'emp_id',
          search: query
        },
        {
          field: 'emp_name',
          search: query
        },
        {
          field: 'rm_code',
          search: query
        },
        {
          field: 'branch_name',
          search: query
        }
      ], false); 
    }
  }
  getAllCustomers(userId: string, roleId: string, branchCode: string = "", custno: string = "", birthmonth: string = "", birthrecom: string = "") {
    this._CommonService.commonGet('ServiceRequest/getAllCustomers?userId=' + userId + "&&roleId=" + roleId + "&&branchCode=" + branchCode+ "&&custno=" + custno+ "&&birthmonth=" + birthmonth+ "&&birthrecom=" + birthrecom+ "&&isbirth=" + this.isbirthday)
      .subscribe(
        response => {
          
          this._customers = JSON.parse(JSON.stringify(response)).customerInformation;
          
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
    }

    getBranchWiseRM() {
      this._CommonService.commonGet('ServiceRequest/getAllRM?branchcode=' + this.branchcode + "&&userid=" + this.userid)
        .subscribe(
          response => {
            this.source.load([]);
            this._rm = JSON.parse(JSON.stringify(response)).rm;
            this.source.load(this._rm);
          },
          error => {
            // this._influxToastaService.showToast('danger', 'Response', error.message);
          },
          () => {
          },
        );
    }

    onCustom(event): void {
      if (event.action === 'transfer') {
        this.savepriority(event.data);
      } 
    }

    setPager() {
      this.source.setPaging(1, this.defaultRowPerPage, true);
      this.settings = Object.assign({}, this.settings);
    }

    savepriority(rmdetails: Rm){
      this.rmpass = rmdetails;
      this.openPopup();
      // const dialogRef = this.dialogService.open(RmUpdateComponent, {
      //   context: {
      //     _rmdetails: rmdetails
      //   },
      // });
      // dialogRef.onClose.subscribe(val => {
      //   if(val === null){

      //   }
      // });
    }
    display = "none";
  
    openPopup() {
      this.ismodalopen = true;
      this.display = "block";
    }
    closePopup() {
      this.ismodalopen = false;
      this.display = "none";
    }
}

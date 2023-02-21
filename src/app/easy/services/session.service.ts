import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { parse } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  dateval: Date;
  finalval: string;

  constructor() { }

  getRole():string {
    return sessionStorage.getItem("RoleId");
  }

  getUser():string {
    return sessionStorage.getItem("userId");
  }

  getBranch():string {
    return sessionStorage.getItem("BranchCode");
  }

  getProject():string {
    return "P026";
  }

  //all role
  getAdmin():string {
    return "R001";
  }

  getVC():string {
    return "R004";
  }

  getPVM():string {
    return "R002";
  }

  getRM():string {
    return "R003";
  }

  //all service
  getBirthday():string {
    return "S001";
  }

  getPickandDrop():string {
    return "S002";
  }

  getMeetandGreet():string {
    return "S003";
  }

  getSkyLounge():string {
    return "S004";
  }

  //allstatus
  getPending():string {
    return "P";
  }

  getRecommendation():string {
    return "R";
  }

  getApprove():string {
    return "A";
  }

  getCancel():string {
    return "C";
  }

  dateformat(date: Date) : string{
    return formatDate(date, 'dd/MM/yyyy hh:mm a', 'en-US', "GMT+0600")
  }

  formatdate(value: string) : Date{
    if(value.includes('PM')){
      var val = value.split(' PM');      
      this.finalval = val[0];
      if(this.finalval.includes('/')){
        var va = this.finalval.replace('/', '-');
        var anva = va.replace('/', '-');
        this.finalval = anva;
        this.finalval = this.finalval + ':00';
      }
      this.dateval = parse(this.finalval, 'dd-MM-yyyy HH:mm:ss', new Date());
      var hour = this.dateval.getHours();
      var pmtime = hour + 12;
      this.dateval.setHours(pmtime);
      return this.dateval;
    }
    else if(value.includes('AM')){
      var val = value.split(' AM');
      this.finalval = val[0];
      if(this.finalval.includes('/')){
        var va = this.finalval.replace('/', '-');
        var anva = va.replace('/', '-');
        this.finalval = anva;
        this.finalval = this.finalval + ':00';
      }
      this.dateval = parse(this.finalval, 'dd-MM-yyyy HH:mm:ss', new Date());
      return this.dateval;      
    }
  }
}

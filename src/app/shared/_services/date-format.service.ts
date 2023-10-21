import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { parse } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  dateval: Date;
  finalval: string;
  constructor() { }

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

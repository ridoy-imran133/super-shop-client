import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CommonComponent {
  public limit_status: string;
  public casa_status: string;
  public fd_status: string;
  public total_status: string;
  need_recomendation: boolean = false;
  constructor(private _CommonService: CommonService) { }

  checkRecomendation(cust_no: string, segment_code: string, limit_applicable: string, service_code: string, casa_balance: string, fd_balance: string, total_balance: string){
    this._CommonService.commonGet('ServiceRequest/checkRecomendation?cust_no=' + cust_no + "&&segment_code=" + segment_code + "&&limit_applicable=" + limit_applicable + "&&service_code=" + service_code + "&&casa_balance=" + casa_balance + "&&fd_balance=" + fd_balance + "&&total_balance=" + total_balance)
    .subscribe(
      response => {
        this.limit_status = JSON.parse(JSON.stringify(response)).limit_status;
        this.casa_status = JSON.parse(JSON.stringify(response)).casa_status;
        this.fd_status = JSON.parse(JSON.stringify(response)).fd_status;
        this.total_status = JSON.parse(JSON.stringify(response)).total_status;
        if(this.limit_status == 'N' || this.casa_status == 'N' || this.fd_status == 'N' || this.total_status == 'N' ){
          this.need_recomendation = true;
        }

        return {
          limit_status: this.limit_status,
          casa_status: this.casa_status,
          fd_status: this.fd_status,
          total_status: this.total_status,
          need_recomendation: this.need_recomendation}; 
          //return[this.limit_status, this.fd_status, this.casa_status, this.total_status, this.need_recomendation]
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }
}

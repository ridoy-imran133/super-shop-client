import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { Gift } from '../../models/Gift';
import { CommonService } from '../../services/common.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'ngx-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss']
})
export class GiftComponent implements OnInit {
  public gifts: Gift[];
  public giftpass: Gift;
  source: LocalDataSource = new LocalDataSource();
  constructor(private _sessionService: SessionService, private _influxToastaService: InfluxToastaService, private _CommonService: CommonService) {
    this.giftpass = new Gift();
   }

  ngOnInit(): void {
    this.getAllGifts();
  }

  settings = {
    
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<span class= "retry"><i class="nb-edit"> Edit</i></span>',
        },
      ],
      position: 'right',
    },

    columns: {
      index: {
        title: 'SL',
        type: 'text',
        valuePrepareFunction: (val, row, cell) => {
          const pager = this.source.getPaging();
          const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;

          return ret;
        },
      },
      gift_code: {
        title: 'Gift Code',
        type: 'string',
      },
      gift_name: {
        title: 'Gift Name',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      vendor_name: {
        title: 'Vendor Name',
        type: 'string',
      },
    },

    mode: 'external',
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
  };

  getAllGifts() {
    this._CommonService.commonGet('ServiceRequest/getAllGifts?userid =' + this._sessionService.getUser())
      .subscribe(
        response => {
          this.source.load([]);
          this.gifts = JSON.parse(JSON.stringify(response)).gifts;
          this.source.load(this.gifts);
        },
        error => {
        },
        () => {
        },
      );
  }

onCustom(event): void {
  if(event.action === 'edit'){
      this.giftpass = event.data;
      this.openPopup();
    }
  }

addGift(){
  this.giftpass = new Gift();
  this.openPopup();
}

display = "none";

openPopup() {
  this.display = "block";
}
closePopup(gift: Gift) {
  this.source.update(this.giftpass, gift);
  this.display = "none";
}

closePopupfornone() {
  this.display = "none";
}

}

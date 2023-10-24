import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonApiConnectService } from '../../../shared/_services/common-api-connect.service';
import { PermitedMenuService } from '../../../shared/_services/permited-menu.service';
import { InfluxToastaService } from '../../../shared/_services/influx.toast.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductModel } from '../../../shared/models/shop/ProductModel';
import { QuantityEditComponent } from './custom-box/quntity-edit.component';
import { ExportService } from '../../../easy/task/export/export.service';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { TransactionModel } from '../../../shared/models/shop/TransactionModel';
import { TransactionWiseProductDTO } from '../../../shared/models/shop/TransactionWiseProductDTO';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'ngx-customer-sales',
  templateUrl: './customer-sales.component.html',
  styleUrls: ['./customer-sales.component.scss']
})
export class CustomerSalesComponent implements OnInit {
  dataArray: TransactionWiseProductDTO[] = [];
  public _transaction: TransactionModel;
  public productcode: string;
  private customArray: any =[];
  public productList: TransactionWiseProductDTO[];
  public productIdList: any = [];
  public searchProduct: TransactionWiseProductDTO;
  source: LocalDataSource = new LocalDataSource();
  isVisible = false;
  constructor(public _commonService: CommonApiConnectService, private _permitedMenuService: PermitedMenuService,
    private _influxToastaService: InfluxToastaService, private exportService:ExportService) { 
      this.searchProduct = new TransactionWiseProductDTO();
      this._transaction = new TransactionModel();
    }

  ngOnInit(): void {
    //this.getAllProduct();
    this.loadMenuPermission();
  }


  settings = {
    
    actions: {
      add: false,
      edit: false,
      delete: false,      
      custom: this.customArray,
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
      ProductCode: {
        title: 'Product Code',
        type: 'string',
      },  
      
      ProductName: {
        title: 'Product Name',
        type: 'string',
      },  
      
      SellingRate: {
        title: 'Rate',
        type: 'number',
      },  
      
      Quantity: {
        title: 'Quantity',
        type: 'custom',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: QuantityEditComponent
      },  
      StockAvailable: {
        title: 'Stock Available',
        type: 'string',
      },  
      Amount: {
        title: 'Amount',
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

  loadMenuPermission() {
    this.customArray = this._permitedMenuService.setCutomSalesProductMenu();
    this.settings.actions.custom = this.customArray;
    this.settings = Object.assign({}, this.settings);
  }
  
  deletedata(productcode){    
    this.source.getAll().then(data => this.deleteFromSource(data, productcode));    
  }

  deleteFromSource(data, productcode){
    data.forEach(element => {
      if(element.ProductCode == productcode){        
        this.source.remove(element);
        this.productIdList.splice(this.productIdList.indexOf(element.ProductCode.toString()), 1);
        // const indexToRemove = this.productIdList.indexOf(element.ProductCode);
        // if (indexToRemove !== -1) {
        //   this.productIdList.splice(this.productIdList.indexOf(element.ProductCode), 1);
        // }
      }
    });
    
  }

  onCustom(event): void {
    if (event.action === 'add') {
      //this.addGenerateRequest(event.data);
    }
    else if (event.action === 'Edit') {
      // this.productpass = event.data;
      // this.addedit = "Edit";
      // this.openPopup();
    }  
    else if (event.action === 'history') {
      //this.customerHistory(event.data);
    }  
    else if (event.action === 'Cancel') {
      this.deletedata(event.data.ProductCode);
    } 
  }

  productSearch(){
    if(this.productIdList.includes(this.productcode)){
      this._influxToastaService.showToast('danger', 'Response', 'Already added this product');
      this.productcode = null;
      return;
    }
    this._commonService.commonGet('Sales/saleProduct/' + this.productcode)
    .subscribe(
      response => {
        this.searchProduct = JSON.parse(JSON.stringify(response)).product.ResponseData;
        this.source.append(this.searchProduct);
        this.productIdList.push(this.searchProduct.ProductCode.toString());
        this._transaction.GrandTotal = this._transaction.GrandTotal + this.searchProduct.Amount;
        this._transaction.PrevGrandTotal = this._transaction.GrandTotal;
        this.productcode = null;
      },
      error => {
      },
      () => {
      },
    );
  }

  public update(mainElement : any, updateElement: any){
    if(updateElement > mainElement.StockAvailable){
      var message = mainElement.ProductName + " available only " + mainElement.StockAvailable;
      this._influxToastaService.showToast('danger', 'Response', message);
    }
    else{
      this.source.update(mainElement, {Quantity: mainElement.Quantity} );
      this._transaction.GrandTotal = (this._transaction.GrandTotal + (mainElement.SellingRate * updateElement)) - mainElement.Amount;
      this._transaction.PrevGrandTotal = this._transaction.GrandTotal;
      this.source.update(mainElement, {Amount: mainElement.SellingRate * updateElement} );
      this.source.refresh();
    }
  }

  public onDiscount(parcent){
    this._transaction.DiscountParcent = parcent;
    this._transaction.DiscountAmount = this._transaction.PrevGrandTotal * (parcent/100);
    this._transaction.DiscountAmount = this._transaction.DiscountAmount + Number(this._transaction.FlatDiscount);
    this._transaction.GrandTotal = this._transaction.PrevGrandTotal - this._transaction.DiscountAmount;
  }

  public onPaymentValue(payVal){
    if(this.productIdList.length< 1){
      this._influxToastaService.showToast('danger', 'Response', 'Add at least one product');
    }
    if(payVal == ""){
      return;
    }
    this._transaction.CollectedAmount = payVal;
    this._transaction.ChangeAmount = this._transaction.CollectedAmount - this._transaction.GrandTotal;
  }

  public onFlatDiscount(fDiscount){
    this._transaction.FlatDiscount = fDiscount;
    this.onDiscount(this._transaction.DiscountParcent);
  }

  getProductLists(){
    this.source.getAll().then(data => this.dataPrepare(data));
  }

  dataPrepare(data){
    this._transaction._products = data;
    this._transaction.UserId = sessionStorage.getItem("username");
    this.save();
    this.exportAsPDF(this._transaction._products);
  }



  save(){
    if(this._transaction.CollectedAmount < this._transaction.GrandTotal){
      this._influxToastaService.showToast('danger', 'Response', 'Collected Amount must be grater than Total Amount');
      return;
    }
    this._commonService.commonPost('Transaction/save' ,this._transaction)
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response)).response;
        if(val.ResponseCode === '2000'){
          //this.dismiss();
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

  exportAsPDF(data):void {
    this.productList = data;
    let startDate = new DatePipe('en-US').transform(new Date(), 'dd/MM/yyyy');
    let endDate = new DatePipe('en-US').transform(new Date(), 'dd/MM/yyyy');
  
    let _header:any[]= [
      [
        {content: 'Grand Total:', styles: { fontStyle: 'bold', valign: 'middle', halign: 'right'}},
        {content: this._transaction.PrevGrandTotal, styles: { valign: 'middle', halign: 'center'}},
      ],
      [
        {content: 'Discount Amount:', styles: { fontStyle: 'bold', valign: 'middle', halign: 'right'}},
        {content: "-"+this._transaction.DiscountAmount, styles: { valign: 'middle', halign: 'center'}},
      ],
      [
        {content: 'Total Amount:', styles: { fontStyle: 'bold', valign: 'middle', halign: 'right'}},
        {content: this._transaction.GrandTotal, styles: { valign: 'middle', halign: 'center'}},
      ],
      [
        {content: 'Collected Amount:', styles: { fontStyle: 'bold', valign: 'middle', halign: 'right'}},
        {content: this._transaction.CollectedAmount, styles: { valign: 'middle', halign: 'center'}},
      ],
      [
        {content: 'Change Amount:', styles: { fontStyle: 'bold', valign: 'middle', halign: 'right'}},
        {content: this._transaction.ChangeAmount, styles: { valign: 'middle', halign: 'center'}},
      ],
    ];
    let _column:any[] =[
      //{header: 'Product Code',dataKey: 'ProductCode',},
      {header: 'Product Name',dataKey: 'ProductName',},
      {header: 'Rate',dataKey: 'SellingRate',},
      {header: 'Quantity',dataKey: 'Quantity',},
      {header: 'Amuont',dataKey: 'Amount',},
    ];
       
    const reportHeader: string = "Product List";
    let _body = this.productList;
    _body = _body == null? [] : _body;
  
   this.exportService.exportAsPDFForCustomerPrint(reportHeader, _header, _column, _body, false);

   
  }

  onInputChanged(event: any) {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue);

    if (!isNaN(numericValue)) {
      event.target.value = numericValue;
    } else {
      event.target.value = '';
    }
  }
}

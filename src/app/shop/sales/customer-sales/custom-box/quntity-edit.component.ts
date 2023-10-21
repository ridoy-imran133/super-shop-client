import { Component, Input, OnInit } from '@angular/core';
import { CustomerSalesComponent } from '../customer-sales.component';

@Component({
  selector: 'ngx-start-date-search',
  template: `<input type="text" [ngModel]="quantityValue" class="form-control" (blur)="onSearchChange($event.target.value)" >`
})
export class QuantityEditComponent implements OnInit{

  @Input() value;
  quantityValue: number;

  constructor(private comp: CustomerSalesComponent) { }

  ngOnInit() {
   this.quantityValue = this.value.Quantity;
  } 

  onSearchChange(newValue): void{
    this.value.Quantity = newValue;
     this.comp.update(this.value, newValue);
  }
}

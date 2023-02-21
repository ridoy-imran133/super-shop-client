import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-inputcom',
  templateUrl: './inputcom.component.html',
  styleUrls: ['./inputcom.component.scss']
})
export class InputcomComponent implements OnInit {
  @Input() name: string;
  @Input() fname: string;
  @Input() place: string;

  public comment: string="";

  public val: string = "";
  constructor() { }

  ngOnInit(): void {
    this.prepF();
  }
  
  prepF(){
    this.val = "<div class='form-group'><input [(ngModel)]= '" + this.name + "' formControlName= '"
    + this.fname + "' class='form-control' type='text' fullWidth nbInput placeholder= '" + this.place + "'></div>";

    this.comment = '<p><em><strong>' +this.name +'</strong></em></p>';
    //this.function(this.val);
  }

}

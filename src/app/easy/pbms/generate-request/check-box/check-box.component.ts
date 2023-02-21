import { Component, Input, OnInit } from '@angular/core';
import { GenerateRequestComponent } from '../generate-request.component';

@Component({
  selector: 'ngx-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {

  renderValue: string;
  @Input() value;
  ch: boolean = true;
 // @Input() rowData: any;

  constructor(private gc: GenerateRequestComponent) { }

 ngOnInit() {
    this.renderValue = this.value.e_mail;
    if(this.renderValue == null){
      this.ch = false;
    }
 }

 clicked(){
   this.gc.userRow(this.value);
 }

}

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-request-button',
  templateUrl: './request-button.component.html',
  styleUrls: ['./request-button.component.scss']
})
export class RequestButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name = 'Angular';
  public items = [
      { name: 'John', otherProperty: 'Foo' },
      { name: 'Joe', otherProperty: 'Bar' }
  ];
 // @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  showMessage() {
    //console.log(message);
  }

}

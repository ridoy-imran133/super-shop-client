import { Component } from '@angular/core';

enum MyEnum {
  AirportPickUpandDrop = "S003"
}


@Component({
  selector: 'ngx-pbms',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class PbmsComponent {
}

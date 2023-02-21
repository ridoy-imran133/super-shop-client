import { animate } from '@angular/animations';
import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';


@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar (mouseover)="hoverCard(true)" (mouseout)="hoverCard(false)" class="menu-sidebar" tag="menu-sidebar" state="compacted">
        <a (click)="toggleSidebar()" href="#" class="sidebar-toggle">
          <nb-icon icon="menu-2-outline"></nb-icon>
        </a>
        <ng-content select="nb-menu" class="hovEffect"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})

// <nb-sidebar class="menu-sidebar" responsive>
//         <a (click)="toggleSidebar()" href="#" class="sidebar-toggle">
//           <nb-icon icon="menu-2-outline"></nb-icon>
//         </a>
//         <ngx-side></ngx-side>
//       </nb-sidebar>

// <nb-sidebar (mouseover)="hoverCard(true)" (mouseout)="hoverCard(false)" class="menu-sidebar" tag="menu-sidebar" state="compacted">
//         <a (click)="toggleSidebar()" href="#" class="sidebar-toggle">
//           <nb-icon icon="menu-2-outline"></nb-icon>
//         </a>
//         <ng-content select="nb-menu" class="hovEffect"></ng-content>
//       </nb-sidebar>
export class OneColumnLayoutComponent {
  public changeText: boolean;
  public loScr: boolean = false;
  constructor(private sidebarService: NbSidebarService,
    private layoutService: LayoutService) {
}

hoverCard(d: boolean){
  if(!this.loScr){
    if(d){
      animate(15000);
      this.sidebarService.expand('menu-sidebar');
      this.layoutService.changeLayoutSize();
    }
    else{
      animate(15000);
      this.sidebarService.compact('menu-sidebar');
      this.layoutService.changeLayoutSize();
    }
  }  
}


toggleSidebar(): boolean {
  //this.sidebarService.toggle(true, 'menu-sidebar');
  this.sidebarService.expand('menu-sidebar');
  this.layoutService.changeLayoutSize();
  this.loScr = !this.loScr;

  return false;
}

  // lockSidebar(){
  //   this.loScr = !this.loScr;
  // }
}

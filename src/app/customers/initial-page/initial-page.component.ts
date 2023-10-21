import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'ngx-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {
  @ViewChild("MenuItems") MenuItems: ElementRef;
  ismenutoggle: boolean = true;
  heightavg: string = "0px";
  navbarfixed: boolean = false;
  constructor(@Inject(DOCUMENT) private document: any,private iconLibraries: NbIconLibraries) { 
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
  }

  menutoggle(){
    if(this.heightavg == "0px"){
      this.heightavg = "200px";
    }
    else{
      this.heightavg = "0px";
    }
  }

  @HostListener('window:scroll', ['$event'])onscroll(e){
    const number = e.target['scrollingElement'].scrollTop;
    if (number > 60) {
        this.navbarfixed = true;
    } else {
        this.navbarfixed = false;
    }

  }

}

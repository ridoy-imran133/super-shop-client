import { Injectable } from '@angular/core';
import { MenuModel } from '../models/MenuModel';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class PermitedMenuService {
  public _menus: MenuModel[];
  vc = this._sessionService.getVC();
  admin = this._sessionService.getAdmin();
  prm = this._sessionService.getRM();
  pvm = this._sessionService.getPVM();
  constructor(private _sessionService: SessionService) { }

  setCutomActionItemsForPendingList(){
    let customArray: any =[];
    customArray.push({name: 'Edit',title: '<span class= "retry">Edit</span>',})

    if(sessionStorage.getItem("RoleId") == this.admin ||sessionStorage.getItem("RoleId") == this.vc){
      customArray.push({name: 'Approval',title: '<span class= "edit">Approval</span>',})
      // customArray.push({name: 'Cancel',title: '<span class= "delete">Cancel</span>',})
    }        
    return customArray;
  }

  setCutomActionItemsForRecomendationList(){
    let customArray: any =[];
    customArray.push({name: 'Edit',title: '<span class= "retry">Edit</span>',})

    if(sessionStorage.getItem("RoleId") != this.prm){
      customArray.push({name: 'Recom',title: '<span class= "edit">Recomendation</span>',})
      // customArray.push({name: 'Cancel',title: '<span class= "delete">Cancel</span>',})
    }        
    return customArray;
  }

  setCutomActionItemsForSkyLounge(){
    let customArray: any =[];
    customArray.push({name: 'Edit',title: '<span class= "retry">Edit</span>',})

    if(sessionStorage.getItem("RoleId") == this.admin ||sessionStorage.getItem("RoleId") == this.vc){
      customArray.push({name: 'Approval',title: '<span class= "edit">Approval</span>',});
      customArray.push({name: 'Cancel',title: '<span class= "delete">Cancel</span>',});
    }        
    return customArray;
  }

  setCutomActionItemsForBirthday(){
    let customArray: any =[];
    // customArray.push({name: 'Edit',title: '<span class= "details">Edit</span>',})

    if(sessionStorage.getItem("RoleId") == this.admin ||sessionStorage.getItem("RoleId") == this.vc){
      customArray.push({name: 'Approval',title: '<span class= "retry">Approval</span>',});
      customArray.push({name: 'Cancel',title: '<span class= "delete">Cancel</span>',});
    }        
    return customArray;
  }

  setCutomActionItemsForGenerateRequest(){
    let customArray: any =[];
    // customArray.push({name: 'Edit',title: '<span class= "details">Edit</span>',})
    customArray.push({name: 'add',title: '<span class= "edit">Add Request</span>',});
    customArray.push({name: 'history',title: '<span class= "edit">History</span>',});
    if(sessionStorage.getItem("RoleId") == this.admin ||sessionStorage.getItem("RoleId") == this.vc){
      customArray.push({name: 'update',title: '<span class= "edit">Update RM</span>',});
    }        
    return customArray;
  }
}

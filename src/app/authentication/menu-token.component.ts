import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { MenuModel } from '../easy/models/MenuModel';
import { UserService } from '../easy/services/user.service';
import { UserProfile } from '../shared/models/shop/UserProfile';
import { ApiRouting } from '../shared/enum/api_routing';
import { LocalSessionService } from '../shared/_services/local-session.service';

@Component({
  selector: 'ngx-menu-token',
  template: ``,
})
export class MenuTokenComponent implements OnInit {

  //autoCollapse="true"
  public menu: NbMenuItem[] = [];
  myJsonString: any;

  public _menuModelList: MenuModel[];
  //menuItems: any[] = [];

  constructor(private _userSevice: UserService,private router: Router, private _localSessionService:LocalSessionService) {
  }

  ngOnInit() {
    this.getMenuAccess();
    //this.createTokenInBackend();
   // this.addMenuItem();
  }

  // createTokenInBackend(){
  //   var userId = sessionStorage.getItem("userId");
  //   const busData = {
  //     BusinessData: userId
  //   }

  //   this._userSevice.generateToken('api/token' ,busData)
  //     .subscribe(
  //       response => {
  //         var data = JSON.parse(JSON.stringify(response));
  //         sessionStorage.setItem("token", data.token);
  //         sessionStorage.setItem("securityToken", data.securityToken);
  //         sessionStorage.setItem("baseToken", data.token);
  //         this.getMenuAccess();
  //         this.getUserInfo();
  //       },
  //       error => {

  //       },
  //       () => {
  //         // No errors, route to new page
  //       }
  //     );
  // }

  public getMenuAccess() {
    var api;
    if(this._localSessionService.isEmployee()){
      api = ApiRouting.EmployeeMenu;
    }
    else{
      api = ApiRouting.usermenu;
    }
    //sessionStorage.setItem("token", sessionStorage.getItem("singlesignintoken"));
    this._userSevice.commonGet( api + this._localSessionService.getUserName() + '/' + this._localSessionService.getAuthToken())
      .subscribe(
        response => {
          var data = JSON.parse(JSON.stringify(response)).menus;
          //this._menuModelList = data.menuInfoList;
          this._menuModelList = data;
          this.formatDataForPresentingMenu(this._menuModelList);
        },
        error => {

        },
        () => {
          // No errors, route to new page
        }
      );
  }

  // getUserInfo() {
  //   this._userSevice.commonGet( 'Security/GetUserInfo?userId=' +sessionStorage.getItem("userId") +'&&projectId=P026')
  //   .subscribe(
  //     response => {
  //       var val = JSON.parse(JSON.stringify(response));
  //       sessionStorage.setItem("RoleId", val.userinfolist[0].roleId);        
  //       sessionStorage.setItem("BranchCode", val.userinfolist[0].branchCode);
  //     },
  //     error => {
  //        this._influxToastaService.showToast('danger', 'Response', error.message);
  //     },
  //     () => {
  //     },
  //   );
  // }

  public formatDataForPresentingMenu(allMenuList: MenuModel[]) {

    allMenuList.forEach(element => {

      if(element.scrParentId == "" || element.scrParentId == null){
        var pbmsMenu: any = {};
        pbmsMenu.title = element.scrName;
        pbmsMenu.icon = element.icon;
        pbmsMenu.link = element.scrLink;
        // if(element.scrName == "Dashboard"){
        //   pbmsMenu.home = true;
        // }
        var parentId = element.scrId;

        allMenuList.forEach(firstChildElement =>{
          if(parentId == firstChildElement.scrParentId){
            var firstChild: any = {};
            firstChild.title = firstChildElement.scrName;
            firstChild.icon = 'people-outline';
            firstChild.link = firstChildElement.scrLink;

            pbmsMenu.children = pbmsMenu.children == undefined ? [] : pbmsMenu.children;
            pbmsMenu.children.push(firstChild);
          }
        });
        this.menu.push(pbmsMenu);
      }
    });
    localStorage.setItem("menuList", JSON.stringify(this.menu));
    if(this._localSessionService.isEmployee()){
      this.router.navigate(['/shop/dashboard']);
    }
    else{
      this.router.navigate(['/customer'])
    }
    
  }

}

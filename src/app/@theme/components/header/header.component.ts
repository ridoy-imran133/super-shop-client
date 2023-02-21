import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../easy/services/user.service';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectList } from './project-list/ProjectList';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  today: string;
  securityurl = environment.securityURL;
  changeText: boolean;
  changeIcon: boolean;
  branchText: string;
  fullName: string;
  src="assets/images/easyapps.png";
  public _projectList : ProjectList[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  ProjectListComponent = ProjectListComponent;
  userPictureOnly: boolean = false;
  branch = "Banch Name";
  user: any;
  users= [];

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile', icon: 'npm' }, { title: 'Log out', icon: 'log-out' } ];

  projectList = [];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private router: Router,
              private breakpointService: NbMediaBreakpointsService,
              private _UserService: UserService) {
                this.changeText = false;
                this.changeIcon = false;
  }

  mouseEnter(div : string){
    this.src = "assets/images/easyapps-hover.png";
 }

 mouseLeave(div : string){
  this.src = "assets/images/easyapps.png";
 }

  ngOnInit() {
    this.today = new DatePipe('en-EN').transform(new Date(new Date()), 'dd-MMM, yyyy');
    this.getAllProject();
    this.getUserInfo();
    //this.testDataSet();
    this.currentTheme = this.themeService.currentTheme;
    this.user = { name: "Nick Jones", picture: "assets/images/nick.png" };
    this.users = [{ name: "Nick Jones", picture: "assets/images/nick.png" }, { name: "Nick Jones", picture: "assets/images/nick.png" }];
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  recordsSub: Subscription = this.menuService.onItemClick().subscribe((event) => {
    this.onItemSelection(event.item.title);
    console.log(event);
  })

  onItemSelection(title) {
    if (title === 'Log out') {
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  navigateHome() {
    //this.menuService.navigateHome();
    this.router.navigate(['/']);
    return false;
  }

  getAllProject() {
    var projectList = localStorage.getItem("projectList");
    if(projectList == null || projectList == ""){
      this._UserService.commonGet( 'Security/GetUserProjects?userId=' +sessionStorage.getItem("userId"))
      .subscribe(
        response => {
          var val = JSON.parse(JSON.stringify(response));
          val.projectInfoList.forEach(element => {
            var project = element;
            project.appIcon = " data:image/png;base64,".concat(project.appIcon);
            console.log(project.appIcon);
            this._projectList.push(project);
            });                
            localStorage.setItem("projectList", JSON.stringify(this._projectList));
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
    }
    else{
      this._projectList = JSON.parse(projectList);
    }
  }

  getUserInfo() {
    this._UserService.commonGet( 'Security/GetUserInfo?userId=' +sessionStorage.getItem("userId") +'&&projectId=P026')
    .subscribe(
      response => {
        var val = JSON.parse(JSON.stringify(response));
        this.branchText = val.userinfolist[0].branchName;
        this.fullName = val.userinfolist[0].userName;
        // sessionStorage.setItem("RoleId", val.userinfolist[0].roleId);        
        // sessionStorage.setItem("BranchCode", val.userinfolist[0].branchCode);
      },
      error => {
        // this._influxToastaService.showToast('danger', 'Response', error.message);
      },
      () => {
      },
    );
  }

  // testDataSet(){
  //   var sampleProjectList = [ { title: 'Easy Asset Management', icon: 'npm', url: 'https://github.com/akveo/ngx-admin' }, { title: 'Easy RM Management', icon: 'npm', data: { id: 'myHeader', },}, { title: 'Easy Gefu Management', icon: 'npm' } ];
  //   this.projectList = sampleProjectList;
  // }

  myfunction(){

  }
}

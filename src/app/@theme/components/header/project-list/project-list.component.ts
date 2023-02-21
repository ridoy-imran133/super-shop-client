import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../easy/services/user.service';
import { ProjectList } from './ProjectList';

@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {

  constructor(private _UserService: UserService) { 
  }

  public _projectList : ProjectList[] = [];
  ngOnInit(): void {
    this.getAllProject();
  }
  getAllProject() {
    var projectList = localStorage.getItem("projectList");
    if(projectList == null || projectList == ""){
          this._UserService.getProjectList()
            .subscribe(
              response => {
                var val = JSON.parse(JSON.stringify(response));
                //this._projectList = val.projectInfoList;
                val.projectInfoList.forEach(element => {
                var project = element;
                project.appIcon = " data:image/png;base64,".concat(project.appIcon);
                console.log(project.appIcon);
                this._projectList.push(project);
                });                
                localStorage.setItem("projectList", this._projectList.toString());
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

  handlerFunc(url, projId){
    url = url + "?userId=" + sessionStorage.getItem("userId") + "&&token=" + sessionStorage.getItem("securityToken") + "&&projectId=" + projId;
    window.location.href = url;
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseurl = environment.baseAPIURL;
  securityurl = environment.securityURL;
  testSecurityurl = environment.securityURL;
  public headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Accept': 'application/json'
    }),
  };

  constructor(private http: HttpClient, private _AuthService: AuthService) { }

  getAllItTeam() {
    return this.http.get(this.baseurl + 'Task/usersItTeam', this.headers);
  }
  getAllVendor() {
    return this.http.get(this.baseurl + 'ServiceRequest/GetAllVendors', this.headers);
  }
  getAllStatusByUser(pId) {
    return this.http.get(this.baseurl + 'Task/GetAllStatusByUser?pId=' + pId, this.headers);
  }

  getUser(pId) {
    return this.http.get(this.baseurl + 'Task/GetUser?pId=' + pId, this.headers);
  }

  DeleteItTeam(pId) {
    return this.http.get(this.baseurl + 'Task/DeleteItTeam?pId=' + pId, this.headers);
  }

  DeleteOwner(pId) {
    return this.http.get(this.baseurl + 'Task/DeleteOwner?pId=' + pId, this.headers);
  }

  getAllUsers() {
    return this.http.get(this.baseurl + 'Task/getUsers', this.headers);
  }

  saveItTeam(formData) {
    return this.http.post(this.baseurl + 'Task/SaveItTeam', formData, this.headers);
  }

  saveUserStatus(formData) {
    return this.http.post(this.baseurl + 'Task/SaveUserStatus', formData, this.headers);
  }

  saveUserDate(formData) {
    return this.http.post(this.baseurl + 'Task/SaveUserDate', formData, this.headers);
  }

  getAllOwner() {
    return this.http.get(this.baseurl + 'Task/owners', this.headers);
  }

  saveOwner(formData) {
    return this.http.post(this.baseurl + 'Task/SaveOwner', formData, this.headers);
  }

  saveUserData(formData) {    
    return this.http.post(this.baseurl + 'Task/SaveUser', formData, this.headers);
  }

  commonPost(url, formData) {    
    // sessionStorage.setItem("token", sessionStorage.getItem("singlesignintoken"));   
    return this.http.post(this.baseurl + url, formData, this.headers);
  }

  generateToken(url, formData) {   
    return this.http.post(this.baseurl + url, formData, this.headers);
  }

  commonGet(url) {
    // sessionStorage.setItem("token", sessionStorage.getItem("singlesignintoken"));
    return this.http.get(this.baseurl + url, this.headers);
  }

  commonSecurityPost(url, formData) {
    var securityHeaders = this.headers;
    if(sessionStorage.getItem('securityToken') == "" || sessionStorage.getItem('securityToken') == null){}
    else{
      this._AuthService.securityToken();
      securityHeaders = this.headers;
      this._AuthService.convertBaseToken();
    }
    return this.http.post(this.securityurl + url, formData, securityHeaders);
  }

  commonSecurityGet(url) {
    var securityHeaders = this.headers;
    if(sessionStorage.getItem('securityToken') == "" || sessionStorage.getItem('securityToken') == null){}
    else{
      this._AuthService.securityToken();
      securityHeaders = this.headers;
      this._AuthService.convertBaseToken();
    }
    return this.http.get(this.securityurl + url, securityHeaders);
  }

  getAllMenu(url) {
    return this.http.get(this.securityurl + url, this.headers);
  }

  getProjectList(){
    return this.http.get(this.securityurl + "/Security/GetUserProjects?userId="+ sessionStorage.getItem("userId"), this.headers);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseurl = environment.baseAPIURL;
  securityurl = environment.securityURL;
  public headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Accept': 'application/json'
    }),
  };

  constructor(private http: HttpClient, private _AuthService: AuthService) { }

  commonPost(url, formData) {
    return this.http.post(this.baseurl + url, JSON.stringify(formData), this.headers);
  }

  commonGet(url) {
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
}

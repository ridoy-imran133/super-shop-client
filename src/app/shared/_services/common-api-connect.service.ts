import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonApiConnectService {

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
}

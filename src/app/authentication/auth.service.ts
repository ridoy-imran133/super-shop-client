import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { InfluxToastaService } from '../shared/_services/influx.toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  constructor(private router: Router, private _influxToastaService: InfluxToastaService) { }

  loggedIn(): boolean{
    //return (sessionStorage.getItem('token') == null ? false : true);
    const token = sessionStorage.getItem('s_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getAuthToken():string {
    return sessionStorage.getItem('a_token')
  }
  getShopToken():string {
    return sessionStorage.getItem('s_token')
  }

  securityToken(){
    sessionStorage.setItem("token", sessionStorage.getItem('securityToken'));
  }

  convertBaseToken(){
    sessionStorage.setItem("token", sessionStorage.getItem('baseToken'));
  }
}

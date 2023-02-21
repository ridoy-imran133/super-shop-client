import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { InfluxToastaService } from '../shared/_services/influx.toast.service';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _influxToastaService: InfluxToastaService,
            private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.loggedIn()){
        return true;
      }
    localStorage.clear();
    this.router.navigate(['/']);    
    return false;
  }
}
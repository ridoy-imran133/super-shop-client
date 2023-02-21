import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class BossInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getShopToken();
    if (token) {
        // If we have a token, we set it to the header
        request = request.clone({
           setHeaders: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
           }
        });
     }
    return next.handle(request).pipe(
      
      
      catchError((error) => {
        return throwError(error.message);
      })).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // let model: APIResponseModel  = event.body;
                
                // if(model.ErrMsg == "Claim Session Null"){
                //  this.logout();
                // }
            }
            return event;
        }));
  }

  
//   private logout() {
//     //Remove Session
//     sessionStorage.removeItem('isUserLoggedIn');
//     sessionStorage.removeItem('loggedInUserInfo');
//     //Logged Out From Server
//     this._authService.signout();
//   }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ngx-login',
  template: ``,
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {    
    //this._cookieService.set("main-token", "value");
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['userId'] != null || params['token'] != null || params['projectId'] != null){
      sessionStorage.setItem("userId", params['userId']);
      sessionStorage.setItem("token", params['token']);
      sessionStorage.setItem("projectId", params['projectId']);
      this.router.navigate(['/menu']);
      }
      else{
        if(sessionStorage.getItem("userId") == null || sessionStorage.getItem("token") == null 
            || sessionStorage.getItem("projectId") == null){
              window.location.href = environment.singleSigninURL +"?returnUrl=" + environment.baseURL;
            }
            else{
              this.router.navigate(['/menu']);
            }
      }
  });
  }

}

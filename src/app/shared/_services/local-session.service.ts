import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSessionService {

  constructor() { }

  getUserName():string {
    return sessionStorage.getItem("username");
  }

  getAuthToken():string {
    return sessionStorage.getItem("a_token");
  }
  isEmployee():boolean {
    return sessionStorage.getItem("employee") == "e";
  }
  sessionClear(){
    sessionStorage.clear();
  }
  localClear(){
    localStorage.clear();
  }
}

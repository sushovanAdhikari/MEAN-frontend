import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import {Router} from "@angular/router"

//deals with everything related to JWT


@Injectable({
  providedIn: 'root'
})
export class JWTService {

  constructor(private router: Router) { }

 // token;

  loggedIn?: BehaviorSubject<boolean> 

  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
     console.log(window.localStorage)
  }

  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  destroyToken(){
    window.localStorage.removeItem('jwtToken');
  }

  
  logout() {
    this.destroyToken();
    this.loggedIn.next(false);
    this.router.navigate([''])  
    console.log(this.loggedIn.getValue())
  }

  buildHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache, must-revalidate'
    };

    if (this.getToken()) {
      headersConfig['Authorization'] = `Token ${this.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

}

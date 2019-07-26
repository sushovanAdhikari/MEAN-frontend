import { JWTService } from '../jwt.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { RedirectService } from "../redirect.service"
import { BehaviorSubject, from } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {


  //Serive method will return true if jwt token is present in the JWT service else it will redirect to the login routeks
  constructor(private _authService: JWTService, private _router: Router, private redirect: RedirectService, private JWT: JWTService) {
  }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

   const jwtToken = this.JWT.getToken();
   this.JWT.loggedIn = new BehaviorSubject<boolean>(jwtToken === undefined ? false : true);

    console.log( "This should be false"+ this._authService.loggedIn.getValue())
     if (this._authService.loggedIn.getValue()) {
        //console.log(this._authService.loggedIn.getValue())
        this.redirect.redirect = state.url
        return true;
    }
    
    this._router.navigate(['']);

    
  }

}
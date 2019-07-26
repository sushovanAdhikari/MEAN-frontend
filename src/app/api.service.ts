import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { admin} from './models/login'
import { IAdmin } from './admin.model'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Service used to send the admin form data to the backend

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  _loginUrl = 'http://localhost:3000/api/user/login'

  constructor(private http: HttpClient) { }

  loginUser(admin:admin) {
    return this.http.post<admin>(this._loginUrl, admin)
  }

  // loginUser(admin): Observable<IAdmin> {
  //   return this.http
  //   .post(this._loginUrl + '/admin', admin)
  //   .map( response => {
  //     return new IAdmin(response.json());
  //   })
  //   .catch(this.handleError);
  // }
}

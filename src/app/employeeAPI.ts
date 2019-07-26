import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Iemployee } from './models/employee'
import { LoginComponent } from './login/login.component'
import { JWTService} from './jwt.service'
import { from } from 'rxjs';
import { HeaderRowOutlet } from '@angular/cdk/table';


@Injectable({
    providedIn: 'root'
  })
  export class EmployeeApiService {
    _getEmployee = 'http://localhost:3000/api/employees/getEmployee'
    _getEmployeeId = 'http://localhost:3000/api/employees/getEmployee/:employeeId'
    _postEmployee = 'http://localhost:3000/api/employees/post'
    _updateEmployee = 'http://localhost:3000/api/employees/getEmployee/put/'
    _createEmployee = 'http://localhost:3000/api/employees/'
    _delEmployee = 'http://localhost:3000/api/employees/getEmployee/:employeeId'
  
    constructor(private http: HttpClient, private JWT: JWTService) { }
  

    //if the JWT header has authorization token, this header will have access to that and will be able to send a successful request to the backend,
    //if the token is missing from the header, the backend will send unauthorized access 
    header: HttpHeaders

    getEmployee() {
       this.header = this.JWT.buildHeaders();
      return this.http.get(this._getEmployee, {headers: this.header})
    }

    addEmployee(employee: Iemployee) {
      this.header = this.JWT.buildHeaders();
      return this.http.post<Iemployee>(this._postEmployee, employee, {headers: this.header})
    }

    updateEmployee(employee: Iemployee) {
      this.header = this.JWT.buildHeaders();
      return this.http.put<Iemployee>(this._updateEmployee, employee, {headers: this.header} )
    }

  }
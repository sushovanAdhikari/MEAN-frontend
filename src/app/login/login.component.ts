import { Component, OnInit, Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { admin } from '../models/login';
import { IAdmin } from '../admin.model'
import {FormBuilder, FormControl, FormGroup, Validators, RequiredValidator} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material';
import {Router} from "@angular/router"
import { BehaviorSubject, from } from 'rxjs';
import { EmployeeApiService } from '../employeeAPI'
import { ToastrService } from 'ngx-toastr';
import { JWTService } from '../jwt.service'
import { transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private myForm: FormGroup;

  loginUserData: IAdmin;

  ngOnInit() {
    this.myForm = this.fb.group(
      { 
        Email: new FormControl(''),
        Password: new FormControl('')
    })

    console.log("Logged In :" + this.JWT.loggedIn.getValue());
    if(this.JWT.loggedIn.getValue()){
      this.router.navigate(['dashboard'])
    }
    else {
      this.router.navigate([''])
    }
  }
  


  loginUser() {

    this.loginUserData = {
      email: this.myForm.get('Email').value,
      password: this.myForm.get('Password').value
    }

    console.log(this.loginUserData)

    this._auth.loginUser(this.loginUserData)
    .subscribe(
      (resp:any) => {


        this.JWT.loggedIn.next(true);
        this.JWT.saveToken(resp.token);
        
        this.router.navigate(['/dashboard']) 
        
      },
      err => { 
        console.log(err.error)
        alert(err.error)
       }
    )

  }


  constructor(private _auth: ApiService, private _empService : EmployeeApiService  ,private fb: FormBuilder, private router: Router, private toastr: ToastrService, private JWT: JWTService, public dialog: MatDialog) { 

    const jwtToken = this.JWT.getToken();

    this.JWT.loggedIn = new BehaviorSubject<boolean>(jwtToken === undefined ? false : true);
    console.log("All the way from Login! This should be false" + this.JWT.loggedIn.getValue())

  }

}


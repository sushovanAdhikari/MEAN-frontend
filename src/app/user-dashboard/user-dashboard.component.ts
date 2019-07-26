import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { Iemployee} from '../models/employee'
import { EmployeeApiService } from '../employeeAPI'
import { MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component'
import { JWTService } from '../jwt.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

//Component access granted to the admins only 
//displays data on a table 
//also has a open dilog method if the user wants to add employees
//employee data is passed from here to the add employee component from here 

export class UserDashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, private _empService : EmployeeApiService, private JWT: JWTService, private route: Router ) {
    
   }

  ngOnInit() {
    this.populateEmployee();
  }

  employee: Iemployee;
  employeeData: Array<Iemployee> = [];
  selectedEmployee: Iemployee;
  emptyEmployee: Iemployee;

  displayedColumns: string[] = ['name', 'email'];
  dataSource = new MatTableDataSource<Iemployee>()
  

 // Array<Iemployee>

  populateEmployee(){
    this._empService.getEmployee().subscribe( (dataEmployee: Iemployee[] ) => {
        this.employeeData = [];
        dataEmployee.forEach( element => {
          this.employeeData.push( {
            _id: element._id ,
            firstName: element.firstName,
            lastName : element.lastName,
            address: element.address,
            city: element.city,
            state: element.state,
            zip: element.zip,
            //postalCode: element.postalCode,
            homephone: element.homephone, 
            cellphone: element.cellphone,
            email: element.email
          } )
        })
        console.log(this.employeeData)
        this.dataSource.data = this.employeeData;
    })
    
  }


  //opens the dialog, if the employee is present, it sends the existing data to the add emp component else it will send a empty employee object
  openDialog(employee):void {

    let addEmployee = false;
    if(employee){
      this.selectedEmployee = employee;
    } else {
      this.emptyEmployee = {
        _id: null,
        firstName: ' ',
            lastName : ' ',
            address: ' ',
            city: ' ',
            state: ' ',
            zip: null,
            //postalCode: null,
            homephone: null, 
            cellphone: null,
            email: ''
      }
    addEmployee = true;
    this.selectedEmployee = null;
    }

    console.log(addEmployee)
    
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '325px',
      data: this.selectedEmployee ? this.selectedEmployee : this.emptyEmployee
    });

    dialogRef.afterClosed().subscribe(result => {
      this.populateEmployee();
      if(addEmployee){
        if(result){
          this.employeeData.push(result);
          this.dataSource.data = this.employeeData; 
        }
      
      }else {
        
        console.log('didnt try to push');
      }

      console.log('The dialog was closed');
      console.log(result);
    });
  }
  

  logout(){
    this.JWT.logout();
  }
}

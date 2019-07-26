import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Iemployee } from '../models/employee'
import { EmployeeApiService } from '../employeeAPI'
import { State } from '../models/state'
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router} from "@angular/router"
import { first } from 'rxjs/operators';

//Accessed when the user clicks on Add new employee or clicks on the existing employee

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})


export class AddEmployeeComponent implements OnInit {

  private myForm: FormGroup;

  newEmployee: Iemployee;

  submitted = false;

  existing=false;

  isValidFormSubmitted = null;

  setState(state: string){
    this.data.state =  state;
    console.log("Set state is working" + state)
  }



  //dropdown values for the state
  states: State[] = [
    {value: 'Alabama', viewValue: 'Alabama'},
    {value: 'Alaska', viewValue: 'Alaska'},
    {value: 'Arizona', viewValue: 'Arizona'},
    {value: 'Arkansas', viewValue: 'Arkansas'},
    {value: 'California', viewValue: 'California'},
    {value: 'Colorado', viewValue: 'Colorado'},
    {value: 'Connecticut', viewValue: 'Connecticut'},
    {value: 'Delaware', viewValue: 'Delaware'},
    {value: 'District Of Columbia', viewValue: 'District Of Columbia'},
    {value: 'Florida', viewValue: 'Florida'},
    {value: 'Georgia', viewValue: 'Georgia'},
    {value: 'Hawaii', viewValue: 'Hawaii'},
    {value: 'Idaho', viewValue: 'Idaho'},
    {value: 'Illinois', viewValue: 'Illinois'},
    {value: 'Indiana', viewValue: 'Indiana'},
    {value: 'Iowa', viewValue: 'Iowa'},
    {value: 'Kansas', viewValue: 'Kansas'},
    {value: 'Kentucky', viewValue: 'Kentucky'},
    {value: 'Louisiana', viewValue: 'Louisiana'},
    {value: 'Maine', viewValue: 'Maine'},
    {value: 'Maryland', viewValue: 'Maryland'},
    {value: 'Massachusetts', viewValue: 'Massachusetts'},
    {value: 'Michigan', viewValue: 'Michigan'},
    {value: 'Minnesota', viewValue: 'Minnesota'},
    {value: 'Mississippi', viewValue: 'Mississippi'},
    {value: 'Missouri', viewValue: 'Missouri'},
    {value: 'Montana', viewValue: 'Montana'},
    {value: 'Nebraska', viewValue: 'Nebraska'},
    {value: 'Nevada', viewValue: 'Nevada'},
    {value: 'New Hampshire', viewValue: 'New Hampshire'},
    {value: 'New Jersey', viewValue: 'New Jersey'},
    {value: 'New Mexico', viewValue: 'New Mexico'},
    {value: 'New York', viewValue: 'New York'},
    {value: 'North Carolina', viewValue: 'North Carolina'},
    {value: 'North Dakota', viewValue: 'North Dakota'},
    {value: 'Ohio', viewValue: 'Ohio'},
    {value: 'Oklahoma', viewValue: 'Oklahoma'},
    {value: 'Oregon', viewValue: 'Oregon'},
    {value: 'Pennsylvania', viewValue: 'Pennsylvania'},
    {value: 'Rhode Island', viewValue: 'Rhode Island'},
    {value: 'South Carolina', viewValue: 'South Carolina'},
    {value: 'South Dakota', viewValue: 'South Dakota'},
    {value: 'Tennessee', viewValue: 'Tennessee'},
    {value: 'Texas', viewValue: 'Texas'},
    {value: 'Utah', viewValue: 'Utah'},
    {value: 'Vermont', viewValue: 'Vermont'},
    {value: 'Virginia', viewValue: 'Virginia'},
    {value: 'Washington', viewValue: 'Washington'},
    {value: 'West Virginia', viewValue: 'West Virginia'},
    {value: 'Wyoming', viewValue: 'Wyoming'},
  ]



  //data of type employee is being injected in the constructor from the parent element user dashboard..
  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>, private _empService: EmployeeApiService , private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: Iemployee, private router: Router) {
       }


  //if the data injected is empty, initialize form to get the new input values from the form else get the existing values 
  ngOnInit() {
    if(this.data._id == null ){
    this.myForm = this.fb.group(
      { 
        firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(35)]),
        lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(35)]),
        address: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(40)]) ),
        city: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(5), Validators.maxLength(50) ]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(50)]),
        //postalCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'),  Validators.minLength(4), Validators.maxLength(9) ]),
        homephone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(999999999), Validators.max(9999999999)]),
        cellphone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(999999999), Validators.max(9999999999)]),
        email: new FormControl('', [Validators.required, Validators.email,  Validators.minLength(10), Validators.maxLength(50)]),       
    })
  } else {
    this.existing = true;
    this.myForm = this.fb.group({
      id:new FormControl(this.data._id),
      firstName: new FormControl(this.data.firstName, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(35)] ),
      lastName: new FormControl(this.data.lastName, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(35)]),
      address: new FormControl(this.data.address, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(40)])),
      city: new FormControl(this.data.city,  [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(5), Validators.maxLength(50) ]),
      state: new FormControl(this.data.state, [Validators.required]),
      zip: new FormControl(this.data.zip, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(50)]),
     // postalCode: new FormControl(this.data.postalCode, [Validators.required, Validators.pattern('[0-9]*'),  Validators.minLength(4), Validators.maxLength(9) ]),
      homephone: new FormControl(this.data.homephone, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(999999999), Validators.max(9999999999)]),
      cellphone: new FormControl(this.data.cellphone, [Validators.required, Validators.pattern('[0-9]*'), Validators.min(999999999), Validators.max(9999999999)]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email,  Validators.minLength(10), Validators.maxLength(50)])
    });
  }
}

//after cancel, closes dialog
  closeDialog() {
    this.dialogRef.close();
  }



  //if the employee exists, the object value will be set to the potentially changed employee values else it will create a new employee
  onSave():void { 
    //if(this.firstName.errors || this.lastName.errors ||this.address.errors || this.city.errors || this.zip.errors || this.homephone.errors || this.cellphone.errors || this.email.errors)
    
    if(this.firstName.invalid || this.lastName.invalid ||this.address.invalid || this.city.invalid || this.zip.invalid || this.homephone.invalid || this.cellphone.invalid || this.email.invalid)
    {
      if(this.firstName.errors){
        console.log("first Name Error")
      } else if(this.lastName.errors) {
        console.log("last name errors")
      } else if(this.address.errors) {
        console.log("address errors")
      } else if(this.city.errors) {
        console.log("city errors")
      } else if(this.zip.errors) {
        console.log("zip errors")
      } 
       else if(this.homephone.errors) {
        console.log("homephone errors")
      } else if(this.cellphone.errors) {
        console.log("cellphone errors")
      } else {
        console.log("Email Error")
      }

    } else{

    let obj = {
      id:this.data._id,
      firstName: this.myForm.get('firstName').value,
      lastName: this.myForm.get('lastName').value,
      address: this.myForm.get('address').value,
      city: this.myForm.get('city').value,
      state: this.myForm.get('state').value,
      zip: this.myForm.get('zip').value,
      homephone: this.myForm.get('homephone').value,
      cellphone: this.myForm.get('cellphone').value,
      email: this.myForm.get('email').value,
    }

    console.log(obj)

    if (this.existing) {
      this._empService.updateEmployee(obj).subscribe( 
        data => {
          console.log("Put request is successful", this.data);
          this.dialogRef.close();
        },
        error => {
          console.log("Error", error);
        });
        
        }else{
          this._empService.addEmployee(obj).subscribe(
            data => {
              console.log("Post request is succesful", data);
              this.dialogRef.close();
            },
            error => {
              console.log("Error", error)
            })
        }
    
      }

    }
    


  //get object will get the value of the object from the form

  get firstName() { return this.myForm.get('firstName'); }
  get lastName() { return this.myForm.get('lastName'); }
  get address() { return this.myForm.get('address'); } 
  get city() { return this.myForm.get('city'); } 
  get zip() { return this.myForm.get('zip'); } 
  get homephone() { return this.myForm.get('homephone'); } 
  get cellphone() { return this.myForm.get('cellphone'); } 
  get email() { return this.myForm.get('email'); } 



  //methods here are used in the html part to see what error the form input has 
  getfirstNameError(){
    return this.firstName.hasError('required') ? 'First Name required' :
    this.firstName.hasError('minlength') ? 'Min Length not met' :
        this.firstName.hasError('pattern') ? 'Invalid Name' :
            '';
  }

  getlastNameError(){

    if(this.lastName.hasError('required')) {
      return 'Last Name required'
    } else if (this.lastName.hasError('pattern')) {
      return 'Pattern invalid'
    } else if (this.lastName.hasError('minlength')){
      console.log('Error min length')
      return 'Min Length not met'
    } else if(this.lastName.hasError('maxlength')) {
      return 'Max Length 35'
    }
  }

  getAddressError(){
    return this.address.hasError('required') ? 'Address required' :
      this.address.hasError('minlength') ? 'Min Length not met' :
        this.address.hasError('pattern') ? 'Invalid Address' :
            '';
  }

  getCityError(){
    return this.city.hasError('required') ? 'City required' :
    this.city.hasError('minlength') ? 'Min Length not met' :
        this.city.hasError('pattern') ? 'Invalid City' :
            '';
  }

  getZipError(){
    return this.zip.hasError('required') ? 'Zip required' :
    this.zip.hasError('minlength') ? 'Min Length not met' :
        this.zip.hasError('pattern') ? 'Invalid Zip' :
            '';
  }

  gethomePhoneError(){
    return this.homephone.hasError('required') ? 'Homephone number required' :
    this.homephone.hasError('minlength') ? 'Min Length not met' :
      this.homephone.hasError('cellphone') ? 'Not a valid number' :
      '';
  }

  getcellPhoneError(){
    return this.cellphone.hasError('required') ? 'Cellphone number required' :
    this.cellphone.hasError('minlength') ? 'Min Length not met' :
      this.cellphone.hasError('cellphone') ? 'Not a valid number' :
      '';
  }

  getEmailError() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
}

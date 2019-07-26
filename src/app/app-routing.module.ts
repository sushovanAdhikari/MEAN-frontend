import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component"

import { AuthGuard } from './guards/auth-guard.service'
import { from } from 'rxjs';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: UserDashboardComponent, canActivate:[AuthGuard]},
  {path: 'add', component: AddEmployeeComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

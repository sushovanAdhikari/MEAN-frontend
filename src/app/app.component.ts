import { Component } from '@angular/core';
import {Router} from "@angular/router"
import { RedirectService} from './redirect.service'
import { JWTService } from './jwt.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { 
  constructor(private router: Router, private redirect: RedirectService, _JWTService: JWTService) {}

}
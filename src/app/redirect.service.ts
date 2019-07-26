import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor() { 
  }

  redirect: String
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetail } from '../classes/user-detail';
import { Http, RequestOptions , Headers } from '@angular/http'; 



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http) { }

  login(userDetail : UserDetail) : Observable<any>  
  {   
      return null;  
  }  
}
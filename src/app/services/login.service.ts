import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginPayload)  
  {   
    const headers={
      "Authorization": "Basic " + btoa("oauth2-jwt-client:$2a$08$qvrzQZ7jJ7oy2p/msL4M0.l83Cd0jNsX6AJUitbgRXGzge4j035ha"),
      "Content-type" : "application/x-www-form-urlencoded"
    }
      return this.http.post("http://localhost:8080" + '/api/oauth/token', loginPayload, {headers});  
  } 
  
  
}
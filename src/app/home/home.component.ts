import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignOutService } from '../services/sign-out.service';
import { HttpClient} from '@angular/common/http'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private signOutService:SignOutService, private http: HttpClient) { }

  ngOnInit() {

    if (!window.sessionStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
    else{
      this.http.get('http://localhost:8080/api/userApi/all')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
    }
  }

  signOut(){
    this.signOutService.signout();
  }
  test(){
    this.http.get('http://localhost:8080/api/userApi/all')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}

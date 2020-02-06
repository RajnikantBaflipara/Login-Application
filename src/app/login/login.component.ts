import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../classes/user-detail';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private userDetail = new UserDetail();
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      password: new FormControl('', Validators.required),
    })
  }
  get f() {
    return this.loginForm.controls;
  }
  LoginForm(LoginInformation) {
    this.userDetail.name = this.Name.value;
    this.userDetail.password = this.Password.value;
    this.router.navigate(['/home']);
  }
  get Name() {
    return this.loginForm.get('name');
  }
  get Password() {
    return this.loginForm.get('password');
  }
}

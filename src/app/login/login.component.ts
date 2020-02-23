import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ErrorStatusMessageService } from '../services/error-status-message.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  login_error: string;
  constructor(private loginService: LoginService, private router: Router, private errorStatusMessageService: ErrorStatusMessageService) { }

  ngOnInit() {
    if (window.sessionStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
    })
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.loginService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      this.router.navigate(['/home']);
    }, error => {
      this.invalidLogin = true;
      this.errorStatusMessageService.errorMessage(error);
    });
  }
}

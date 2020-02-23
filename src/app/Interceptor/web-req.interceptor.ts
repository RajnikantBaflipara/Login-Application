import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpClient, HttpRequest, HttpHandler, HttpErrorResponse, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SignOutService } from '../services/sign-out.service';

@Injectable({
    providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {
    stringifiedData: any;
    constructor(private http: HttpClient,private loginService: LoginService, private router: Router, private signOutService:SignOutService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (window.sessionStorage.getItem('token')) {
            this.stringifiedData = JSON.parse(window.sessionStorage.getItem('token'));
            console.log("For other method==>"+this.stringifiedData.access_token)
            request = request.clone({
                setParams: {
                    access_token: this.stringifiedData.access_token
                }
            });
            return next.handle(request)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        if (error.status === 401) {
                            return this.refereshAccessToken()
                            .pipe(
                                switchMap(() => {
                                    request = this.addAuthHeader(request);
                                  return next.handle(request);
                                }),
                                catchError((err: any) => {
                                  this.signOutService.signout();
                                  return empty();
                                })
                              )
                        }
                        return throwError(error);
                    })
                );
        }
        else {
            return next.handle(request);
        }
    };
    refereshAccessToken() {
        const body = new HttpParams()
            .set('refresh_token', this.stringifiedData.refresh_token)
            .set('grant_type', 'refresh_token');
         window.sessionStorage.removeItem('token');
        const headers = {
            "Authorization": "Basic " + btoa("oauth2-jwt-client:$2a$08$qvrzQZ7jJ7oy2p/msL4M0.l83Cd0jNsX6AJUitbgRXGzge4j035ha"),
            "Content-type": "application/x-www-form-urlencoded"
        }
        return this.http.post("http://localhost:8080" + '/api/oauth/token', body, { headers })
        .pipe(
            tap((res: HttpResponse<any>) => {
                window.sessionStorage.setItem('token', JSON.stringify(res));
            })
          )
    }

    addAuthHeader(request: HttpRequest<any>) {
        // get the access token
        this.stringifiedData = JSON.parse(window.sessionStorage.getItem('token'));
        if (this.stringifiedData) {
          // append the access token to the request header
          return request.clone({
            setParams: {
                access_token: this.stringifiedData.access_token
            }
          })
        }
        return request;
      }
}


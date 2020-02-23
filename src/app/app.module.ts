import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import Http module  
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
// import module for Routing.  
import { RouterModule } from '@angular/router';  
import { WebReqInterceptor } from './Interceptor/web-req.interceptor';
// import ReactiveFormsModule for reactive form  
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,  
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([  
      {  
        path : '',  
        component : LoginComponent   
      },  
      {  
        path : 'login',  
        component : LoginComponent    
      },
      {  
        path : 'home',  
        component : HomeComponent    
      }
    ])  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

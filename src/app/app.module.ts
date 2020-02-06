import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import Http module  
import { HttpModule} from '@angular/http';
// import module for Routing.  
import { RouterModule } from '@angular/router';  
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
    HttpModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorStatusMessageService {

  constructor() { }

  errorMessage(error)  
  { 
    console.log(error);
    if(error.status==0){
      alert("Service not reachable. Please connect after some time..!!");
    }
    if(error.status==401){
      alert("Hey, You Stop right there, Authorization Required..!!");
    }
    if(error.status==401){
      alert("Sorry we couldn't find the result..!!");
    }
  }
}

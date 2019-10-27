import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  message: string = "";

  constructor() { }

  ngOnInit() {
  }

  logIn(): void{
    var element = document.getElementById("message");

    if(this.username == "" || this.password == ""){
      this.message = "All fields are mandatory";
      element.classList.remove("success-message");
      element.classList.remove("warning-message");
      element.classList.add("error-message");
    }else{
      this.message = "Success";
      element.classList.remove("error-message");
      element.classList.remove("warning-message");
      element.classList.add("success-message");
    }
  }

}

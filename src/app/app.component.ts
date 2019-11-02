import { Component } from '@angular/core';
import { UserAuthService } from './services/userAuth/user-auth.service';
import { Faculty } from './models/Faculty';
import { Student } from './models/Student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Academics';
  loggedIn: boolean = false;
  facultyLoggedIn: boolean = false;

  username: string = "";
  facultyPassword: string = "";
  usn: string = "";
  studentPassword: string = "";
  message: string = "";

  faculty: Faculty;
  student: Student;
  who: string = "";

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    if(sessionStorage.getItem('token')){
      this.loggedIn = true;
      this.facultyLoggedIn = true;
    }else if(sessionStorage.length > 0){
      this.loggedIn = true;
      this.facultyLoggedIn = false;
    }
  }

  facultyLogIn(){
    var element = document.getElementById("message");

    if(this.username == "" || this.facultyPassword == ""){
      this.message = "All fields are mandatory";
      element.classList.remove("success-message");
      element.classList.remove("warning-message");
      element.classList.add("error-message");
    }else{
      this.userAuthService.facultyLogIn(this.username, this.facultyPassword)
      .subscribe(response => {
        this.faculty = response;
        if(this.faculty.authenticated){
          this.loggedIn = true;
          this.facultyLoggedIn = true;
          this.who = "faculty";
          sessionStorage.setItem("email", this.faculty.email);
          sessionStorage.setItem("name", this.faculty.name);
          sessionStorage.setItem("token", this.faculty.token);
          this.router.navigate([`/students-list/${this.who}`]);
        }else{
          this.message = this.faculty.message;
          element.classList.remove("success-message");
          element.classList.remove("warning-message");
          element.classList.add("error-message");
        }
      },
      error => {
        console.log(error);
        this.message = error.error.message;
        element.classList.remove("success-message");
        element.classList.remove("warning-message");
        element.classList.add("error-message");
      });
    }
  }

  studentLogIn(){
    var element = document.getElementById("message");

    if(this.usn == "" || this.studentPassword == ""){
      this.message = "All fields are mandatory";
      element.classList.remove("success-message");
      element.classList.remove("warning-message");
      element.classList.add("error-message");
    }else{
      this.userAuthService.studentLogIn(this.usn, this.studentPassword)
      .subscribe(response => {
        this.student = response;
        if(this.student.authenticated){
          this.loggedIn = true;
          this.who = "student";
          sessionStorage.setItem("id", this.student.id);
          sessionStorage.setItem("usn", this.student.usn);
          sessionStorage.setItem("name", this.student.name);
          sessionStorage.setItem("div", this.student.div);
          sessionStorage.setItem("email", this.student.email);
          sessionStorage.setItem("contact", this.student.contact.toString());
          this.router.navigate([`/student-marksheet/${this.student.id}/${this.student.name}/${this.student.usn}/${this.who}`]);
        }else{
          this.message = this.student.message;
          element.classList.remove("success-message");
          element.classList.remove("warning-message");
          element.classList.add("error-message");
        }
      },
      error => {
        console.log(error);
        this.message = "Server Down";
        element.classList.remove("success-message");
        element.classList.remove("error-message");
        element.classList.add("warning-message");
      });
    }
  }

  logOut(){
    if(this.facultyLoggedIn){
      let token = sessionStorage.getItem("token");
      this.userAuthService.logOut(token)
      .subscribe(
        response => {
          this.facultyLoggedIn = false;
          this.loggedIn = false;
          sessionStorage.clear();
          this.router.navigate(["/"]);
        },
        error => {
          console.log(error);
        }
      );
    }else{
      sessionStorage.clear();
      this.loggedIn = false;
      this.router.navigate(["/"]);
    }
    
  }
}

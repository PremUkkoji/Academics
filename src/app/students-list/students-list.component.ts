import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student/student.service';
import { Student } from '../models/Student';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  allStudents: Student[] = [];
  aDivStudents: Student[] = [];
  bDivStudents: Student[] = [];
  message: string = "";
  modalStudent: Student = {
    authenticated: null,
    id: "",
    usn: "",
    name: "",
    email: "",
    div: "",
    contact: null,
    message: ""
  };
  student: Student = {
    authenticated: null,
    id: "",
    usn: "",
    name: "",
    email: "",
    div: "",
    contact: null,
    message: ""
  };
  div: string = "";
  who: string = "";

  constructor(
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.div = "";
    this.getStudents();

    this.activatedRoute.paramMap
    .subscribe(
      params => {
        this.who = params.get('who');
      }
    );
  }

  getStudents(){
    this.studentService.getStudents()
    .subscribe(
      response => {
        this.allStudents = response;
        for(var i=0;i<this.allStudents.length;i++){
          var stud = this.allStudents[i];
          if(stud.div == "A" || stud.div == "a"){
            this.aDivStudents.push(stud);
          }else if(stud.div == "B" || stud.div == "b"){
            this.bDivStudents.push(stud);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  changeModalStudent(student){
    this.modalStudent = student;
    this.student = this.modalStudent;
  }

  deleteStudent(student){
    this.studentService.deleteStudent(student.id)
    .subscribe(
      response => {
        var element = document.getElementById("message");
        this.message = response.message;
        element.classList.remove("error-message");
        element.classList.remove("warning-message");
        element.classList.add("success-message");
        this.aDivStudents = [];
        this.bDivStudents = [];
        this.getStudents();
      },
      error => {
        console.log(error);
        var element = document.getElementById("message");
        this.message = error.message;
        element.classList.remove("success-message");
        element.classList.remove("warning-message");
        element.classList.add("error-message");
      }
    );
  }

  goToMarkSheet(student){
    let id = student.id;
    let name = student.name;
    let usn = student.usn;
    this.router.navigate([`/student-marksheet/${id}/${name}/${usn}/${this.who}`]);
  }

  updateStudent(){
    this.studentService.updateStudent(this.student)
    .subscribe(
      response => {
        var element = document.getElementById("message");
        this.message = response.message;
        element.classList.remove("error-message");
        element.classList.remove("warning-message");
        element.classList.add("success-message");
        this.aDivStudents = [];
        this.bDivStudents = [];
        this.getStudents();
      },
      error => {
        console.log(error);
        var element = document.getElementById("message");
        this.message = error.message;
        element.classList.remove("success-message");
        element.classList.remove("warning-message");
        element.classList.add("error-message");
      }
    );
  }

  addStudent(){
    this.student = {
      authenticated: null,
      id: "",
      usn: "",
      name: "",
      email: "",
      div: "",
      contact: null,
      message: ""
    };
  }

  createStudent(){
    this.studentService.createStudent(this.student)
    .subscribe(
      response => {
        var element = document.getElementById("message");
        this.message = response.message;
        element.classList.remove("error-message");
        element.classList.remove("warning-message");
        element.classList.add("success-message");
        this.aDivStudents = [];
        this.bDivStudents = [];
        this.getStudents();
      },
      error => {
        console.log(error);
        var element = document.getElementById("message");
        this.message = error.error.message;
        element.classList.remove("success-message");
        element.classList.remove("warning-message");
        element.classList.add("error-message");
      }
    );
  }
}

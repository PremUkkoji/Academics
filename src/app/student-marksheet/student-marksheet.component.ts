import { Component, OnInit } from '@angular/core';
import { Ia } from '../models/Ia';
import { StudentService } from '../services/student/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-marksheet',
  templateUrl: './student-marksheet.component.html',
  styleUrls: ['./student-marksheet.component.scss']
})
export class StudentMarksheetComponent implements OnInit {

  message: string = "";
  ia: Ia = {
    mat: [0,0,0,0],
    matAvg: 0,
    ds: [0,0,0,0],
    dsAvg: 0,
    ade: [0,0,0,0],
    adeAvg: 0,
    co: [0,0,0,0],
    coAvg: 0,
    se: [0,0,0,0],
    seAvg: 0,
    dms: [0,0,0,0],
    dmsAvg: 0
  };

  editIa: Ia = {
    mat: [0,0,0,0],
    matAvg: 0,
    ds: [0,0,0,0],
    dsAvg: 0,
    ade: [0,0,0,0],
    adeAvg: 0,
    co: [0,0,0,0],
    coAvg: 0,
    se: [0,0,0,0],
    seAvg: 0,
    dms: [0,0,0,0],
    dmsAvg: 0
  };

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) { }


  studentId: string = "";
  studentName: string = "";
  studentUsn: string = "";
  who: string = "";
  readOnly: boolean = true;
  showButton: boolean = false;

  ngOnInit() {
    this.activatedRoute.paramMap
    .subscribe(
      params => {
        this.studentId = params.get('id');
        this.studentName = params.get('name');
        this.studentUsn = params.get('usn');
        this.who = params.get('who');
    });

    if(this.who != "faculty")
    {
      this.readOnly = false;
      this.showButton = true;
    }
    this.getStudentMarks();
  }

  getStudentMarks(){
    this.studentService.getStudentMarks(this.studentId)
    .subscribe(
      response => {
        console.log(response);
        this.ia = response;
        this.editIa = { ...this.ia };
      },
      error => {
        console.log(error);
      }
    );
  }

  matMarksChange(value, i){
    this.editIa.mat[i] = +value;
    let total = +this.editIa.mat[0] + +this.editIa.mat[1] + +this.editIa.mat[2] + +this.editIa.mat[3];
    let avg = total/4;
    this.editIa.matAvg = avg;
  }

  dsMarksChange(value, i){
    this.editIa.ds[i] = +value;
    let total = +this.editIa.ds[0] + +this.editIa.ds[1] + +this.editIa.ds[2] + +this.editIa.ds[3];
    let avg = total/4;
    this.editIa.dsAvg = avg;
  }

  adeMarksChange(value, i){
    this.editIa.ade[i] = +value;
    let total = +this.editIa.ade[0] + +this.editIa.ade[1] + +this.editIa.ade[2] + +this.editIa.ade[3];
    let avg = total/4;
    this.editIa.adeAvg = avg;
  }

  coMarksChange(value, i){
    this.editIa.co[i] = +value;
    let total = +this.editIa.co[0] + +this.editIa.co[1] + +this.editIa.co[2] + +this.editIa.co[3];
    let avg = total/4;
    this.editIa.coAvg = avg;
  }

  seMarksChange(value, i){
    this.editIa.se[i] = +value;
    let total = +this.editIa.se[0] + +this.editIa.se[1] + +this.editIa.se[2] + +this.editIa.se[3];
    let avg = total/4;
    this.editIa.seAvg = avg;
  }

  dmsMarksChange(value, i){
    this.editIa.dms[i] = +value;
    let total = +this.editIa.dms[0] + +this.editIa.dms[1] + +this.editIa.dms[2] + +this.editIa.dms[3];
    let avg = total/4;
    this.editIa.dmsAvg = avg;
  }

  undoChanges(){
    if(this.who == "faculty"){
      // this.editIa = { ...this.ia };
      // alert(this.editIa.mat[0]);
      // alert(this.ia.mat[0]);
      alert("Feature coming soon");
    }else{
      this.message = "Only Faculty is allowed to make changes";
      var element = document.getElementById("message");
      element.classList.remove("error-message");
      element.classList.remove("success-message");
      element.classList.add("warning-message");
    } 
  }

  saveMarks(){
    if(this.who == "faculty"){
      this.studentService.saveMarks(this.studentId, this.editIa)
      .subscribe(
        response => {
          this.message = response.message;
          var element = document.getElementById("message");
          element.classList.remove("error-message");
          element.classList.remove("warning-message");
          element.classList.add("success-message");
          this.ia = { ...this.editIa };
        },
        error => {
          this.undoChanges();
          console.log(error);
        }
      );
    }else{
      this.message = "Only Faculty is allowed to make changes";
      var element = document.getElementById("message");
      element.classList.remove("error-message");
      element.classList.remove("success-message");
      element.classList.add("warning-message");
    }
    
  }

}

import { Injectable } from '@angular/core';
import { Student } from '../../models/Student';
import { Message } from '../../models/Message';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Ia } from 'src/app/models/Ia';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[];

  constructor(
    private httpClient: HttpClient
  ) { }

  getStudents(): Observable<Student[]>{
    const url = "http://localhost:3000/student";
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'authorization': sessionStorage.getItem("token")
      })
    };
    return this.httpClient.get<Student[]>(url, httpOptions);
  }

  // getStudent(id): Observable<Student>{
  //   const url = "http://localhost:3000/student";
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //      'Content-Type': 'application/json',
  //      'authorization': sessionStorage.getItem("token"),
  //      'id': id
  //     })
  //   };

  //   return this.httpClient.get<Student>(url, httpOptions);
  // }

  deleteStudent(id): Observable<Message>{
    const url = "http://localhost:3000/student/";
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'id': id,
       'authorization': sessionStorage.getItem("token")
      })
    };

    return this.httpClient.delete<Message>(url, httpOptions);
  }

  createStudent(student): Observable<Message>{
    const url = "http://localhost:3000/student/";
    let body = {
      usn: student.usn,
      name: student.name,
      email: student.email,
      password: student.usn,
      div: student.div,
      contact: student.contact
    };
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'authorization': sessionStorage.getItem("token")
      })
    };

    return this.httpClient.post<Message>(url, body, httpOptions);
  }

  updateStudent(student): Observable<Message>{
    const url = "http://localhost:3000/student/";
    let body = {
      id: student.id,
      usn: student.usn,
      name: student.name,
      email: student.email,
      password: student.usn,
      div: student.div,
      contact: student.contact
    };
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'authorization': sessionStorage.getItem("token")
      })
    };

    return this.httpClient.patch<Message>(url, body, httpOptions);
  }

  getStudentMarks(id){
    const url = `http://localhost:3000/student-marksheet/${id}`;

    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
      })
    };

    return this.httpClient.get<Ia>(url, httpOptions);
  }

  saveMarks(studentId, editIa): Observable<Message>{
    const url = "http://localhost:3000/student-marksheet/";
    let body = {
      id: studentId,
      ia: editIa,
    }
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'authorization': sessionStorage.getItem("token")
      })
    };

    return this.httpClient.patch<Message>(url, body, httpOptions);
  }

}

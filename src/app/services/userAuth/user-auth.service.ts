import { Injectable } from '@angular/core';
import { Faculty } from 'src/app/models/Faculty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/Student';
import { Message } from '../../models/Message';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
    })
  };

  facultyLogIn(username, password): Observable<Faculty>{
    var url = "http://localhost:3000/login/faculty";
    var body = {
      email: username,
      password: password
    };
    return this.httpClient.post<Faculty>(url, body, this.httpOptions);
  }

  studentLogIn(usn, password): Observable<Student>{
    var url = "http://localhost:3000/login/student";
    var body = {
      usn: usn,
      password: password
    };
    return this.httpClient.post<Student>(url, body, this.httpOptions);
  }

  logOut(token): Observable<Message>{
    var url = "http://localhost:3000/login/logoutFaculty";
    let body = {};
    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': token
      })
    };
    return this.httpClient.post<Message>(url, body, httpOptions);
  }
}

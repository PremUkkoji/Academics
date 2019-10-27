import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { StudentMarksheetComponent } from './student-marksheet/student-marksheet.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';


const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "student-marksheet", component: StudentMarksheetComponent
  },
  {
    path: "students-list", component: StudentsListComponent
  },
  {
    path: "student-details", component: StudentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

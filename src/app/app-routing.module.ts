import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentMarksheetComponent } from './student-marksheet/student-marksheet.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';


const routes: Routes = [
  {
    path: "", redirectTo: "students-list", pathMatch: "full"
  },
  {
    path: "student-marksheet/:id/:name/:usn/:who", component: StudentMarksheetComponent
  },
  {
    path: "students-list/:who", component: StudentsListComponent
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

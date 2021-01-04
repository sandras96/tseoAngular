
import { ExamPeriodComponent } from './exam-period/exam-period.component';

import { ProfessorViewComponent } from './professor/professor-view/professor-view.component';
import { StudentComponent } from './student/student/student.component';
import { ProfessorComponent } from './professor/professor/professor.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { PaymentStudentComponent } from './student/student-details/payment-student/payment-student/payment-student.component';
import { ProfileStudentComponent } from './student/student-details/profile-student/profile-student/profile-student.component';
import { NavStudentComponent } from './student/student-details/nav-student/nav-student/nav-student.component';
import { UserListComponent } from './user/user-list/user-list.component';

import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { UpdateCourseComponent } from './course/update-course/update-course.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { LoginGuard } from './services/login-guard.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthGuard } from './services/auth-guard.service';
import { DocumentStudentComponent } from './student/student-details/documents-student/document-student/document-student.component';
import { CourseViewComponent } from './course/course-view/course-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},

  { path: 'navbar', component: NavbarComponent, canActivate:[AuthGuard]},
 // { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  {path: 'courses', component: CourseListComponent},
 // {path : 'courses/:id', component: CourseDetailsComponent},
  {path: 'add-course', component: AddCourseComponent},

  {path: 'exams', component: ExamListComponent},

 // { path: '', redirectTo: 'login', pathMatch: 'full' },

 {path: 'students', component: StudentComponent},
// {path : 'students/:id', component: StudentDetailsComponent},
// {path : 'students/:id/documents', component: UserDocumentsComponent},
 {path: 'add-student', component : AddStudentComponent},

 {path: 'users', component: UserListComponent},

  { path: 'no-access', component: NoAccessComponent },

{path: 'students/:id', component: NavStudentComponent, children : [
  {
    path: ':id/profile', component : ProfileStudentComponent
  },
  {
    path: 'documents', component : DocumentStudentComponent
  },
  {
    path: 'payments', component : PaymentStudentComponent
  }
]},

{path: 'course-view/:id', component: CourseViewComponent},

{path: 'professors', component: ProfessorComponent},
{path : 'professors/:id', component: ProfessorViewComponent},


{path: 'examperiod' , component: ExamPeriodComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

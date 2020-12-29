import { UserListComponent } from './user/user-list/user-list.component';
import { UserDocumentsComponent } from './document/user-documents/user-documents.component';
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
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'navbar', component: NavbarComponent, canActivate:[AuthGuard]},
 // { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'courses', component: CourseListComponent},
  {path : 'courses/:id', component: CourseDetailsComponent},
  {path: 'add-course', component: AddCourseComponent},

  {path: 'exams', component: ExamListComponent},
 // {path: '**', redirectTo: 'navbar'},
 // { path: '', redirectTo: 'login', pathMatch: 'full' },

 {path: 'students', component: StudentListComponent},
 {path : 'students/:id', component: StudentDetailsComponent},
 {path : 'students/:id/documents', component: UserDocumentsComponent},

 {path: 'users', component: UserListComponent},

  { path: 'no-access', component: NoAccessComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

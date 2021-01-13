import { ExamViewComponent } from './exam/exam-view/exam-view.component';
import { CourseComponent } from './course/course/course.component';
import { StudentComponent } from './student/student/student.component';

import { ExamPeriodComponent } from './exam-period/exam-period.component';

import { ProfessorViewComponent } from './professor/professor-view/professor-view.component';

import { ProfessorComponent } from './professor/professor/professor.component';




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
import { CourseViewComponent } from './course/course-view/course-view.component';
import { StudentViewComponent } from './student/student-view/student-view.component';
import { UserComponent } from './user/user/user.component';
import { ExamComponent } from './exam/exam/exam.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},

  { path: 'navbar', component: NavbarComponent, canActivate:[AuthGuard]},
 // { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },


 // { path: '', redirectTo: 'login', pathMatch: 'full' },





{ path: 'no-access', component: NoAccessComponent },


{path: 'courses', component: CourseComponent},
{path: 'course-view/:id', component: CourseViewComponent},
{path: 'add-course', component: AddCourseComponent},

{path: 'users', component: UserComponent},


{path: 'professors', component: ProfessorComponent},
{path : 'professors/:id', component: ProfessorViewComponent},

{path: 'students', component: StudentComponent},
{path : 'students/:id', component: StudentViewComponent},


{path: 'exams', component: ExamComponent},
{path: 'exam-view/:id', component: ExamViewComponent},

{path: 'examperiod' , component: ExamPeriodComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

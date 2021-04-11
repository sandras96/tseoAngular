import { CreatePaymentComponent } from './student/student-payments/create-payment/create-payment.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { Course } from 'src/app/model/course.model';
import { StudentDashboardComponent } from './dashboard/student-dashboard/student-dashboard.component';
import { ProfessorCoursesComponent } from './professor/professor-courses/professor-courses.component';
import { ExamPeriodListComponent } from './exam-period/exam-period-list/exam-period-list.component';
import { ExamPeriodViewComponent } from './exam-period/exam-period-view/exam-period-view.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { ExamViewComponent } from './exam/exam-view/exam-view.component';
import { CourseComponent } from './course/course/course.component';
import { StudentComponent } from './student/student/student.component';



import { ProfessorViewComponent } from './professor/professor-view/professor-view.component';

import { ProfessorComponent } from './professor/professor/professor.component';





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
import { UserViewComponent } from './user/user-view/user-view.component';
import { ExamPeriodComponent } from './exam-period/exam-period/exam-period.component';
import { ProfessorExamsComponent } from './professor/professor-exams/professor-exams.component';
import { StudentGuardService } from './services/student-guard.service';
import { ProfessorGuardService } from './services/professor-guard.service';
import { ProfessorDashboardComponent } from './dashboard/professor-dashboard/professor-dashboard.component';
import { CourseGuardService } from './services/course-guard.service';
import { ExamGuardService } from './services/exam-guard.service';
import { AddPaymentComponent } from './student/student-payments/add-payment/add-payment.component';

const routes: Routes = [
 
  
{ path: 'no-access', component: NoAccessComponent, canActivate:[AuthGuard]},
{ path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},

{path: 'courses', component: CourseComponent, canActivate:[AuthGuard]},
{path: 'courses/:id', component: CourseViewComponent, canActivate:[AuthGuard, CourseGuardService]},
{path: 'add-course', component: AddCourseComponent, canActivate:[AuthGuard, AdminAuthGuard]},

{path: 'users', component: UserComponent, canActivate:[AuthGuard, AdminAuthGuard]},
{path: 'users/:id', component: UserViewComponent, canActivate:[AuthGuard, AdminAuthGuard]},
{path: 'user-create', component: UserCreateComponent, canActivate:[AuthGuard, AdminAuthGuard]},

{path: 'professors', component: ProfessorComponent, canActivate:[AuthGuard, AdminAuthGuard]},
{path : 'professors/:id', component: ProfessorViewComponent, canActivate:[AuthGuard, ProfessorGuardService]},

{path: 'students', component: StudentComponent, canActivate:[AuthGuard, AdminAuthGuard]},
{path : 'students/:id', component: StudentViewComponent, canActivate:[AuthGuard,StudentGuardService]},


{path: 'exams', component: ExamComponent, canActivate:[AuthGuard]},
{path: 'exams/:id', component: ExamViewComponent, canActivate:[AuthGuard, ExamGuardService]},

{path: 'examperiods' , component: ExamPeriodComponent, canActivate:[AuthGuard]},
{path: 'examperiods/:id' , component: ExamPeriodViewComponent, canActivate:[AuthGuard,AdminAuthGuard]},


//{path: 'add-payment/:id' , component: AddPaymentComponent},

{path: 'create-payment/:id', component: CreatePaymentComponent},
//{ path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
{ path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


import { LoginGuard } from './services/login-guard.service';
import { TokenStorageService } from './services/token-storage.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { UpdateCourseComponent } from './course/update-course/update-course.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { NavStudentComponent } from './student/student-details/nav-student/nav-student/nav-student.component';
import { DocumentStudentComponent } from './student/student-details/documents-student/document-student/document-student.component';
import { ProfileStudentComponent } from './student/student-details/profile-student/profile-student/profile-student.component';
import { PaymentStudentComponent } from './student/student-details/payment-student/payment-student/payment-student.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { ProfessorComponent } from './professor/professor/professor.component';
import { ProfessorListComponent } from './professor/professor-list/professor-list.component';
import { ProfessorDetailComponent } from './professor/professor-detail/professor-detail.component';
import { StudentComponent } from './student/student/student.component';
import { ProfessorViewComponent } from './professor/professor-view/professor-view.component';
import { ProfessorProfileComponent } from './professor/professor-profile/professor-profile.component';
import { ProfessorCoursesComponent } from './professor/professor-courses/professor-courses.component';
import { ProfessorExamsComponent } from './professor/professor-exams/professor-exams.component';
import { ExamPeriodComponent } from './exam-period/exam-period.component';


import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseUnitComponent } from './course/course-unit/course-unit.component';
import { EnrrollmentsComponent } from './course/enrrollments/enrrollments.component';
import { CourseProfessorsComponent } from './course/course-professors/course-professors.component';
import { CourseExamsComponent } from './course/course-exams/course-exams.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NoAccessComponent,
    NavbarComponent,
    AddCourseComponent,
    CourseDetailsComponent,
    CourseListComponent,
    UpdateCourseComponent,
    ExamListComponent,
    AddStudentComponent,
    StudentDetailsComponent,
    StudentListComponent,
    UserListComponent,
    NavStudentComponent,
    DocumentStudentComponent,
    ProfileStudentComponent,
    PaymentStudentComponent,
    ProfessorComponent,
    ProfessorListComponent,
    ProfessorDetailComponent,
    StudentComponent,
    ProfessorViewComponent,
    ProfessorProfileComponent,
    ProfessorCoursesComponent,
    ProfessorExamsComponent,
    ExamPeriodComponent,
    CourseViewComponent,
    CourseUnitComponent,
    EnrrollmentsComponent,
    CourseProfessorsComponent,
    CourseExamsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
    NgxPaginationModule,

    

  ],
  exports:[],
  providers: [
    
    AuthService,
    authInterceptorProviders,
    TokenStorageService,
    AuthGuard,
    AdminAuthGuard,
    LoginGuard
 
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

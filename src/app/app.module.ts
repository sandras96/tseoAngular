import { EnrrollmentsComponent } from './course/enrrollments/enrrollments.component';

import { LoginGuard } from './services/login-guard.service';
import { TokenStorageService } from './services/token-storage.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ModalModule } from './_modal';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { UpdateCourseComponent } from './course/update-course/update-course.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';


import { NgxPaginationModule} from 'ngx-pagination';
import { ProfessorComponent } from './professor/professor/professor.component';
import { ProfessorListComponent } from './professor/professor-list/professor-list.component';
import { ProfessorDetailComponent } from './professor/professor-detail/professor-detail.component';
import { ProfessorViewComponent } from './professor/professor-view/professor-view.component';
import { ProfessorProfileComponent } from './professor/professor-profile/professor-profile.component';
import { ProfessorCoursesComponent } from './professor/professor-courses/professor-courses.component';
import { ProfessorExamsComponent } from './professor/professor-exams/professor-exams.component';
import { ExamPeriodComponent } from './exam-period/exam-period.component';


import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseUnitComponent } from './course/course-unit/course-unit.component';
import { CourseProfessorsComponent } from './course/course-professors/course-professors.component';
import { CourseExamsComponent } from './course/course-exams/course-exams.component';
import { StudentComponent } from './student/student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentViewComponent } from './student/student-view/student-view.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { StudentCoursesComponent } from './student/student-courses/student-courses.component';
import { StudentExamsComponent } from './student/student-exams/student-exams.component';
import { StudentDocumentsComponent } from './student/student-documents/student-documents.component';
import { StudentPaymentsComponent } from './student/student-payments/student-payments.component';
import { CourseComponent } from './course/course/course.component';
import { CourseList1Component } from './course/course-list1/course-list1.component';
import { UserComponent } from './user/user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ExamComponent } from './exam/exam/exam.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { ExamViewComponent } from './exam/exam-view/exam-view.component';
import { ExamUnitComponent } from './exam/exam-unit/exam-unit.component';
import { ExamTakingComponent } from './exam/exam-taking/exam-taking.component';
import { ExamCourseComponent } from './exam/exam-course/exam-course.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { StudentCreateComponent } from './user/student-create/student-create.component';
import { ProfessorCreateComponent } from './user/professor-create/professor-create.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';



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
    ProfessorComponent,
    ProfessorListComponent,
    ProfessorDetailComponent,
    ProfessorViewComponent,
    ProfessorProfileComponent,
    ProfessorCoursesComponent,
    ProfessorExamsComponent,
    ExamPeriodComponent,
    CourseViewComponent,
    CourseUnitComponent,
    CourseProfessorsComponent,
    CourseExamsComponent,
    EnrrollmentsComponent,
    StudentComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentViewComponent,
    StudentProfileComponent,
    StudentCoursesComponent,
    StudentExamsComponent,
    StudentDocumentsComponent,
    StudentPaymentsComponent,
    CourseComponent,
    CourseList1Component,
    UserComponent,
    UserListComponent,
    UserDetailComponent,
    ExamComponent,
    ExamListComponent,
    ExamViewComponent,
    ExamUnitComponent,
    ExamTakingComponent,
    ExamCourseComponent,
    UserViewComponent,
    UserCreateComponent,
    StudentCreateComponent,
    ProfessorCreateComponent,
    UploadFilesComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule,
    

  ],
  exports:[],
  providers: [
    
    AuthService,
    authInterceptorProviders,
    TokenStorageService,
    AuthGuard,
    AdminAuthGuard,
    LoginGuard,
    
 
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

import { LoginGuard } from './services/login-guard.service';
import { TokenStorageService } from './services/token-storage.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from  '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { UpdateCourseComponent } from './course/update-course/update-course.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { NavigationComponent } from './navigation/navigation.component';
import { AddProfessorComponent } from './professor/add-professor/add-professor.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { UserDocumentsComponent } from './document/user-documents/user-documents.component';
import { UserListComponent } from './user/user-list/user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    NoAccessComponent,
    NavbarComponent,
    AddCourseComponent,
    CourseDetailsComponent,
    CourseListComponent,
    UpdateCourseComponent,
    NavigationComponent,
    AddProfessorComponent,
    ExamListComponent,
    AddStudentComponent,
    StudentDetailsComponent,
    StudentListComponent,
    UserDocumentsComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
   
    

  ],
  exports:[
    NgbModule,
    NgbCollapseModule
  ],
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

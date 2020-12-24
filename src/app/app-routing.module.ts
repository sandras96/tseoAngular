import { LoginGuard } from './services/login-guard.service';
import { StudentComponent } from './student/student.component';
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
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  {
     path: 'admin',
     component: AdminComponent, 
     canActivate: [AuthGuard, AdminAuthGuard]},
  { path: 'student', component: StudentComponent},
  { path: 'no-access', component: NoAccessComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Student } from '../model/student.model';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuardService implements CanActivate {

  isLoggedIn = false;
  private roles: string[];
  student : Student;
  studentId : number;
  constructor(private router : Router,
    private authService : AuthService,
    private tokenStorage : TokenStorageService,
    private activatedRoute : ActivatedRoute) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("CAN ACTIVATE Student AUTH GUARD")
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser();
      this.roles = user.authorities;
      
      this.studentId  =  route.params.id;
      this.student = JSON.parse(localStorage.getItem('currentStudent'));
      console.log("Student id je ", this.studentId , "a student je ", this.student)
      if(this.roles.includes("ADMIN") || this.studentId == this.student.id) return true;
       
      this.router.navigate(['no-access']);
      return false;
        
    }
  }
}

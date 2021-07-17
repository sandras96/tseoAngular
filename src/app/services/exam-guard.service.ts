import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Professor } from '../model/professor.model';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { ProfessorService } from './professor.service';
import { map } from 'rxjs/operators';
import { ExamService } from './exam.service';

@Injectable({
  providedIn: 'root'
})
export class ExamGuardService implements CanActivate{

  isLoggedIn = false;
  private roles: string[];
  professorId : number;
  professor : Professor;
  courseProfessors : Professor[];
  
  examId : number;
  constructor(private router : Router,
    private authService : AuthService,
    private tokenStorage : TokenStorageService,
    private examService : ExamService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("CAN ACTIVATE EXAM AUTH GUARD")
    this.isLoggedIn = this.authService.isLoggedIn();
   
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser();
      this.roles = user.authorities;
      
      this.professor = JSON.parse(localStorage.getItem('currentProfessor'));
    
      this.examId = route.params.id;
      if(this.roles.includes("ADMIN"))return true
     

      else if(this.professor!=null){
        return this.examService.getByProfessorId(this.professor.id)
        .pipe(map(response=>{
          if(response.some(x=> x.id == this.examId))return true;
          

          this.router.navigate(['no-access'])
          return false;
        }))
      }
      this.router.navigate(['no-access'])
      return false;
      
    }

    

    }
}

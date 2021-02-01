import { map, switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { ProfessorService } from './professor.service';
import { Professor } from '../model/professor.model';

@Injectable({
  providedIn: 'root'
})
export class CourseGuardService implements CanActivate{

  isLoggedIn = false;
  private roles: string[];
  professorId : number;
  professor : Professor;
  courseProfessors : Professor[];
  
  courseId : number;
  constructor(private router : Router,
    private authService : AuthService,
    private tokenStorage : TokenStorageService,
    private professorService : ProfessorService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("CAN ACTIVATE course AUTH GUARD")
    this.isLoggedIn = this.authService.isLoggedIn();
   
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser();
      this.roles = user.authorities;
      
      this.professor = JSON.parse(localStorage.getItem('currentProfessor'));
     
        this.courseId = route.params.id;
        return this.professorService.getAllByCourseId(this.courseId)
        .pipe(map(response=>{
          console.log("uloga je ", this.roles)
          if(this.professor!=null){
            if(response.some(x => x.id == this.professor.id)) return true;
          }else if(this.roles.includes("ADMIN") ) return true;
            
  
           
  
            this.router.navigate(['no-access'])
            return false;
        }))
      
      }

    }
  
  }
      
     
          
          
       
        
       


          // this.courseProfessors = data;
          // console.log("kurs profesori suu ", data)
          // this.courseProfessors.forEach(cp => { 
          //   console.log("cp je ", cp, "prof je ", this.professor)
          //   if(cp.id === this.professor.id) return true;
            
           
            
            
          // });
         
        
 
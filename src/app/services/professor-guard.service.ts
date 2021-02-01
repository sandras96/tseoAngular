import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Professor } from '../model/professor.model';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorGuardService implements CanActivate{
  isLoggedIn = false;
  private roles: string[];
  professor : Professor;
  professorId : number;
  constructor(private router : Router,
    private authService : AuthService,
    private tokenStorage : TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("CAN ACTIVATE Professor AUTH GUARD")
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser();
      this.roles = user.authorities;
      
      this.professorId  =  route.params.id;
      this.professor = JSON.parse(localStorage.getItem('currentProfessor'));
      if(this.professor != null){
        if(this.professorId == this.professor.id) return true
      }else if(this.roles.includes("ADMIN")) return true;
       
      this.router.navigate(['no-access']);
      return false;
        
    }
  }
}

import { TokenStorageService } from './token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  isLoggedIn = false;
  private roles: string[];

  constructor(private router : Router,
              private authService : AuthService,
              private tokenStorage : TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("CAN ACTIVATE ADMIN AUTH GUARD")
    this.isLoggedIn = this.authService.isLoggedIn();
    
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser();
      this.roles = user.authorities;
       if(this.roles.includes("ADMIN")) return true;
        
       
          this.router.navigate(['no-access']);
          return false;
        
    }
  }
}

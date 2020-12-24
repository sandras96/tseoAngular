import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  isLoggedIn = false;
  constructor(
    private router : Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

  canActivate(route, state: RouterStateSnapshot){
    this.isLoggedIn = this.authService.isLoggedIn();
   
    if(this.isLoggedIn){
      console.log("raaadi")
      this.router.navigate(['/navbar']);
      return true;
    
    }
    console.log("JEL RADI")
   // return this.router.navigate(['/login']);
    return false
  }
}

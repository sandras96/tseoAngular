import { TokenStorageService } from './token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = false;
  constructor(
    private router : Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService) { }

  canActivate(route, state: RouterStateSnapshot){
    console.log("CAN ACTIVATE AUTH GUARD")
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('this.loggedInUser jeee' + this.authService.isLoggedIn())
    if(this.isLoggedIn){
      console.log("LOgovan sam"  + this.authService.isLoggedIn())
      return true;
    } 
 //   if(this.tokenService.getUser) return true;

    this.router.navigate(['/login'], {queryParams: { returnUrl:state.url }});
    return false;


  }
}

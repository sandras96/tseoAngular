import { TokenStorageService } from './token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn = false;

  constructor(private router : Router, 
              private authService: AuthService,
              private tokenStorage: TokenStorageService) { }

  canActivate(route, state: RouterStateSnapshot){
    console.log("route data: ", route.data)
    console.log("CAN ACTIVATE AUTH GUARD")
    this.isLoggedIn = this.authService.isLoggedIn();
   
    if(this.isLoggedIn) return true;
    
 //   if(this.tokenService.getUser) return true;
   
    this.router.navigate(['/'], {queryParams: { returnUrl:state.url }});
   
    return false;


  }
}

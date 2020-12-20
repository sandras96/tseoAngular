import { TokenStorageService } from './token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router : Router,
    private authService : AuthService,
    private tokenStorage : TokenStorageService
  ) { }

  canActivate(){
    let user = this.tokenStorage.getUser();
    if(user && user.authorities=="ADMIN"){
      return true;
    }
    else this.router.navigate(['/no-access']);
    return false;
  }
}

import { TokenStorageService } from './token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router : Router,
    private authService: AuthService,
    private tokenService: TokenStorageService) { }

  canActivate(route, state: RouterStateSnapshot){
    if(this.tokenService.getUser) return true;

    this.router.navigate(['/login'], {queryParams: { returnUrl:state.url }});
    return false;


  }
}

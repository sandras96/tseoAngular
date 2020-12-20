import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import jwt_decode from "jwt-decode";

import { map } from 'rxjs/operators';

import { Observable,throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roles: string[];


  constructor(
    private http : HttpClient,
    private tokenStorage : TokenStorageService
    ) { }
  
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  login2(credentials) { 
    return this.http.post(AUTH_API + 'login', 
       JSON.stringify(credentials), httpOptions)
       .pipe(map(response =>{
         console.log(response);
        let result : any = response;
        let token = result && result['access_token'];
        let role = result['authorities'];
        if(token){
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          return true; //we are mapping our object into boolean
        }
        return false;
       }));
   }

  

  isLoggedIn() { 
    
    let token = localStorage.getItem('token');
    if(!token){
      return false;
    }
    let isExpired = jwtHelper.isTokenExpired(token);
    console.log("isExpired", isExpired);
    
    return !isExpired;
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if(!token) return null;   
    
    return jwtHelper.decodeToken(token);
  }

  get currentUserRole(){
    let token = localStorage.getItem('token');
    if(!token) return null;   
    console.log("UsrROLE = " + localStorage.getItem('role'))
    return localStorage.getItem('role');
  }

  

}

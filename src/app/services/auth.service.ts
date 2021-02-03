import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { catchError, map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StudentService } from './student.service';
import { ProfessorService } from './professor.service';
import { Student } from '../model/student.model';


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
  loggedInUser = false;
  
  userId : any;
  constructor(private http : HttpClient,
              private tokenStorage : TokenStorageService, 
              private studentService : StudentService, 
              private professorService : ProfessorService) { }
  

  login(credentials): Observable<any> {
    console.log("CREDENTIALS SU " + credentials.username + credentials.password)
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  login2(credentials) { 
    return this.http.post(AUTH_API + 'login', 
       JSON.stringify(credentials), httpOptions)
       .pipe(map(response =>{
         let result : any = response;
         if(result && result.access_token){
           console.log("result iz responsa je ", result)
           this.tokenStorage.saveToken(result.access_token);
           this.tokenStorage.saveUser(result);
           this.userId = this.tokenStorage.getUser().id;
           const user = this.tokenStorage.getUser();
           this.roles = user.authorities;
        
           this.getCurrentUser(this.userId);
          
           return true
          
         }
         return false
     
       }),catchError((error: any) => {
        if (error.status === 401) {
          return throwError('Unauthorized');
        }
        else {
          return throwError(error.json().error || 'Server error');
        }
      }))
   }

  

  isLoggedIn() : boolean{ 
  //  this.loggedInUser = !!this.tokenStorage.getToken();
    let token = this.tokenStorage.getToken();
    if(!token){
      return false;
    }
    
    let isExpired = jwtHelper.isTokenExpired(token);
   
    if(isExpired){
      console.log("isteko sam")
      localStorage.clear();
    }
    return !isExpired;
  //  this.loggedInUser = true;
    
    
   
//  let token = localStorage.getItem('token');
//   if(!token){
 //    return false;
 //  }
// 
  }

  
  userRole(): string{
    if(this.isLoggedIn()){
        const user = this.tokenStorage.getUser();
        this.roles = user.authorities;
        if(this.roles.includes('ADMIN')){
          return 'admin';
        }
        if(this.roles.includes('STUDENT')){
          return 'student';
        }
        if(this.roles.includes('PROFESSOR')){
          return 'professor';
        }
    }
  }
  
  getCurrentUser(id) {
    // if(this.userRole()=='admin'){
    //   return this.tokenStorage.getUser();
    //  }  
    if(this.userRole()=='student'){
     
     this.getStudent(id);
     this.studentService.getByUserId(id).subscribe(
      data=>{
        localStorage.setItem('currentStudent', JSON.stringify(data))
      }, error=>{
        console.log(error)
      }
    )
    }
    if(this.userRole()=='professor'){
      this.professorService.getByUserId(id).subscribe(
        data=>{
          localStorage.setItem('currentProfessor', JSON.stringify(data))
        }, error=>{
          console.log(error)
        }
      )
    }
  }

  getStudent(id){
    return this.studentService.getByUserId(id).toPromise();
  }

  changePassword(oldPassword,newPassword): Observable<String>{
    console.log("koje su sifre : ", oldPassword, newPassword)
    let pc = {
      "oldPassword":oldPassword,
      "newPassword":newPassword
    }
    console.log("CP "+ JSON.stringify(pc));
    return this.http.post(AUTH_API + 'change-password',pc).pipe(map(data => JSON.stringify(data))
    ,catchError((error: any) => {
      if (error.status === 401) {
        return throwError('Unauthorized');
      }
      if(error.status == 200){
        return throwError("OK")
      }
      else {
        return throwError(error.json().error || 'Server error');
      }
    })
    )
  }
}

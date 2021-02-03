import { TokenStorageService } from './../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  isLoggedIn = false;
 

  constructor(public tokenStorage: TokenStorageService,
              private authService : AuthService) { }

  ngOnInit(): void {
   
  //  this.isLoggedIn = !!this.tokenStorage.getToken();
  //  this.isLoggedIn = this.authService.isLoggedIn();
 //   if (this.isLoggedIn) {
      
      // const user = this.tokenStorage.getUser();
      // this.roles = user.authorities;
      // console.log("ROLES SU " + this.roles)
      // console.log("USER JE " + user.username)

      // this.showAdminBoard = this.roles.includes('ADMIN');
      // this.showStudentBoard = this.roles.includes('USER');
      // this.showProfessorBoard = this.roles.includes('PROFESSOR');


      // this.username = user.username;
 //   }
  }
checkLoggedIn() : boolean {
  this.isLoggedIn = this.authService.isLoggedIn();
  if(this.isLoggedIn){
   
    return true
  }
  return false
}
  

 
}


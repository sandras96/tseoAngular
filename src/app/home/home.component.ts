import { TokenStorageService } from './../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showStudentBoard = false;
  showProfessorBoard = false;

  username: string;

  constructor(public tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.authorities;
      console.log("ROLES SU " + this.roles)
      console.log("USER JE " + user.username)

      this.showAdminBoard = this.roles.includes('ADMIN');
      this.showStudentBoard = this.roles.includes('USER');
      this.showProfessorBoard = this.roles.includes('PROFESSOR');


      this.username = user.username;
    }
  }

  logout(): void {
    console.log("LOGOUT!")
    this.tokenStorage.signOut();
  

  }

 

}

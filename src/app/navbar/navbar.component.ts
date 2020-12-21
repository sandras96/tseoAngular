import { TokenStorageService } from './../services/token-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = false;
  private roles: string[];
  isLoggedIn = false;
  username: string;
 
  constructor(public tokenStorage : TokenStorageService) {
    
   }
   ngOnInit(): void {
     
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.authorities;
      console.log("ROLES SU " + this.roles)
      console.log("USER JE " + user.username)

     


      this.username = user.username;

    }

   
    


    $("#menu-toggle").on("click",function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  
    }

   
  
  
    userRole(): string{

      const user = this.tokenStorage.getUser();
      this.roles = user.authorities;
      if(this.isLoggedIn){
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
  
  logout(){
    console.log("LOGOUT")
    this.tokenStorage.signOut();
  }

}
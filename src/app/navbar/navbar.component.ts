import { AuthService } from 'src/app/services/auth.service';
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
  userRole : string;
  username: string;
  isExpired = false;
 
  constructor(private tokenStorage : TokenStorageService, private authService: AuthService) {
    
   }
   ngOnInit(): void {
     
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.authorities;
      this.userRole = this.authService.userRole();
      this.username = user.username;
      this.isLoggedIn = true;
     
    
      console.log("ROLES SU " + this.roles);
      console.log("TRENUTNA ROLA JE " + this.userRole)
      console.log("USER JE " + user.username);
     
    }

   $("#menu-toggle").on("click",function(e) {
      e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
  
    }

  logout(){
    console.log("LOGOUT")
    this.tokenStorage.signOut();
  

  }

}
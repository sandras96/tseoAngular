import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
 

  constructor(public tokenStorage: TokenStorageService,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
  }
  checkLoggedIn() : boolean {
    this.isLoggedIn = this.authService.isLoggedIn();
    if(this.isLoggedIn){
      return true
    }
    return false
  }

  logout(){
    console.log("LOGOUT")
    this.isLoggedIn = false;

    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
}

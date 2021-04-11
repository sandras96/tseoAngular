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

  }

  
checkLoggedIn() : boolean {
  this.isLoggedIn = this.authService.isLoggedIn();
  if(this.isLoggedIn){
   
    return true
  }
  return false
}
  

 
}


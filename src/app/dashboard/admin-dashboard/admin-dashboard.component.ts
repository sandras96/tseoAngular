import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userId : number;

  constructor(private tokenStorage : TokenStorageService,
              private router : Router) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().id;

  }

  goToMyProfile(){
    this.router.navigate(['users',this.userId]);
}
}

import { AuthService } from './../../services/auth.service';
import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  userId : number
  student : Student;
  constructor(private tokenStorage : TokenStorageService,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().id;
  }

  goToMyProfile(){
    
    if(this.authService.userRole()=="student"){
      this.student = JSON.parse(localStorage.getItem('currentStudent'));
      console.log("Student iz lokala je " , this.student)
      this.router.navigate(['students', this.student.id]);
    }
    
  }
}

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

  
  student : Student;
  constructor( private router : Router) { }

  ngOnInit(): void {
  }

  goToMyProfile(){
      this.student = JSON.parse(localStorage.getItem('currentStudent'));
      console.log("Student iz lokala je " , this.student)
      this.router.navigate(['students', this.student.id]);
  }
}

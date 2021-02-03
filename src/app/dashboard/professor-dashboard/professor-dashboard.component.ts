import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/model/professor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.css']
})
export class ProfessorDashboardComponent implements OnInit {

  professor : Professor;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToMyProfile(){
      this.professor = JSON.parse(localStorage.getItem('currentProfessor'));
      console.log("Prof iz lokala je " , this.professor)
      this.router.navigate(['professors', this.professor.id]);
  
    
  }
}

import { Authority } from './../../model/authority.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/app/model/professor.model';
import { ProfessorService } from 'src/app/services/professor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.component.html',
  styleUrls: ['./professor-profile.component.css']
})
export class ProfessorProfileComponent implements OnInit {
 
  @Input() professor : Professor;
 
  authorities : Authority[];
  authority : String;
  isChecked = true;

 
  message = "";
  constructor(private professorService : ProfessorService,
              private router : Router ) { }

  ngOnInit(): void {
  
   this.authorities = this.professor.user.authorities;

  }
 

  updateProfessor(): void {
    this.professorService.update(this.professor.id, this.professor)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'This Student was updated successfully!';
          
        },
        error => {
          console.log(error);
        });
  }
deleteProfessor() : void {
  this.professorService.delete(this.professor.id)
    .subscribe(
      response =>{
        this.router.navigate(['/professors']);
      }, 
      error => {
        console.log(error)
      }
    )
}


 
  
}

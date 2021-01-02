import { Component, Input, OnInit } from '@angular/core';
import { Professor } from 'src/app/model/professor.model';
import { User } from 'src/app/model/user.model';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.component.html',
  styleUrls: ['./professor-profile.component.css']
})
export class ProfessorProfileComponent implements OnInit {

  @Input() professor : Professor;
  @Input() user : User;

  message = "";
  constructor(private professorService : ProfessorService) { }

  ngOnInit(): void {
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
}

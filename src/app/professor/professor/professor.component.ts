import { Professor } from './../../model/professor.model';
import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  public professor : Professor;
  public professors : Professor[];

  constructor(private professorService : ProfessorService) { }

  ngOnInit(): void {
    this.getProfessors();  
  }

  getProfessors() {  
    this.professorService.getAll()  
    .subscribe((professors: Professor[]) => this.professors = professors);  
  }   

  selected(professor : any){
    this.professor = professor;
    console.log("PROF JE " + professor.id);
  }

}

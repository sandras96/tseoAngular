import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Professor } from 'src/app/model/professor.model';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {

  @Input() public professors: Professor[];  
  @Output() public professorSelected = new EventEmitter<Professor>(); 

  constructor() { }

  ngOnInit(): void {
  }

  selectProfessor(professor: Professor) {  
    this.professorSelected.emit(professor);  
    console.log("SELECTOVANI PROF JE " + professor )   
  }  
}

import { ProfessorDetailComponent } from './../professor-detail/professor-detail.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Professor } from 'src/app/model/professor.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
  

})
export class ProfessorListComponent implements OnInit {

  @Input() public professors: Professor[];  
  @Output() public professorSelected = new EventEmitter<Professor>(); 

  HighlightRow : any;  
  ClickedRow:any; 
  
  constructor() {
    this.ClickedRow = function(index){  
      this.HighlightRow = index;  
  }  
   }

  ngOnInit(): void {
  }

  selectProfessor(professor: Professor) {  
    this.professorSelected.emit(professor);  
    

  }  


}

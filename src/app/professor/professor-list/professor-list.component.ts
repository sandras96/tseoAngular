import { ProfessorDetailComponent } from './../professor-detail/professor-detail.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Professor } from 'src/app/model/professor.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProfessorService } from 'src/app/services/professor.service';


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
  
  constructor(private professorService : ProfessorService) {
    this.ClickedRow = function(index){  
      this.HighlightRow = index;  
  }  
   }

  ngOnInit(): void {
  }

  selectProfessor(professor: Professor) {  
    this.professorSelected.emit(professor);  
    

  }  
  retrieveStudents(search, param){
    console.log("serach je ", search , "a param by je ", param)
    if(search!=""){
      if(param=="firstname"){
        this.searchByFirstname(search);
      }
      if(param=="lastname"){
        this.searchByLastname(search);
      }
      if(param=="role"){
        this.searchByRole(search);
      }
    }else{
      this.getProfessors();
    }
   }
  getProfessors(){ 
    this.professorService.getAll().subscribe(data=>this.professors=data);
  }
   searchByFirstname(search){
    this.professorService.findByFirstname(search)
      .subscribe(data=>{
          this.professors =data;
           console.log(data)
         })
   }
  
   searchByLastname(search){
    this.professorService.findByLastname(search)
    .subscribe(data=>{
        this.professors =data;
         console.log(data)
       })
   }
  
   searchByRole(search){
    this.professorService.findByRole(search)
    .subscribe(data=>{
        this.professors =data;
         console.log(data)
       })
   }


}

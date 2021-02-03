import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  @Input() public students : Student[];
  @Output() public studentSelected = new EventEmitter<Student>();
  
  HighlightRow : any;  
  ClickedRow:any; 
  
  constructor(private studentService : StudentService) {
      this.ClickedRow = function(index){  
      this.HighlightRow = index;  
   }  
   }

  ngOnInit(): void {
  }
 
   selectStudent(student: Student){
     this.studentSelected.emit(student);
   }

  removeStudent(student){

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
      if(param=="indexnumber"){
        this.searchByIndexnumber(search);
      }
    }else{
      this.getStudents();
    }
   }
   getStudents(){
     this.studentService.getAll().subscribe(data=>this.students = data);
   }
  
   searchByFirstname(search){
    this.studentService.findByFirstname(search)
      .subscribe(data=>{
          this.students =data;
           console.log(data)
         })
   }
  
   searchByLastname(search){
    this.studentService.findByLastname(search)
    .subscribe(data=>{
        this.students =data;
         console.log(data)
       })
   }
  
   searchByIndexnumber(search){
    this.studentService.findByIndexnumber(search)
    .subscribe(data=>{
        this.students =data;
         console.log(data)
       })
   }

}

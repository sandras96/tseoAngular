import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/model/student.model';

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
  
  constructor() {
    this.ClickedRow = function(index){  
      this.HighlightRow = index;  
  }  
   }

  ngOnInit(): void {
  }

  selectStudent(student: Student){
    this.studentSelected.emit(student);
  }

}

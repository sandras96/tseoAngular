import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public student : Student;
  public students : Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
    this.studentService.getAll()
      .subscribe( data => {
        this.students = data;
      }, error =>{
        console.log(error)
      })
  }

  selected(student : any){
    this.student = student;
    console.log("STUDENT JE ", student)
  }
}

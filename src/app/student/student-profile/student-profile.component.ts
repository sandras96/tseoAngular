import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  @Input() student : Student;

  constructor(private studentService : StudentService,
              private router : Router) { }

  ngOnInit(): void {
  }

  updateStudent() : void {
    this.studentService.update(this.student.id, this.student)
      .subscribe(
        response => {
          console.log("Updated student", response)
        },
        error => {
          console.log(error)
        }
      )
  }

  deleteStudent() : void {
    this.studentService.delete(this.student.id)
      .subscribe(
        response => {
          this.router.navigate(['/students']);
        },
        error => {
          console.log(error)
        }
      )
  }

}

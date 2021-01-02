import { Router } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student : Student = new Student();
  submitted = false;

  constructor(private studentService : StudentService,
              private router : Router) { }

  ngOnInit(): void {
    this.submitted = false;
    this.student = new Student();
  }

  onSubmit(){
    this.submitted = true;
    this.save();
  }

  save(){
    this.studentService
      .create(this.student)
        .subscribe(data => {
          console.log(data);
          this.student = new Student();
          this.goToList();
        },
        error => console.log(error));
  }

  goToList(){
    this.router.navigate(['/students'])
  }

}

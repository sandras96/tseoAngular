import { StudentService } from './../../../../services/student.service';
import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-student',
  templateUrl: './nav-student.component.html',
  styleUrls: ['./nav-student.component.css']
})
export class NavStudentComponent implements OnInit {

  currentStudent : Student = null;
  student_id : number;
  @Input() student : Student;

  constructor(private studentService : StudentService,
              private route: ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    this.student = new Student();
    this.getStudent(this.route.snapshot.paramMap.get('id'));
  }
  getStudent(id) : void {
    this.studentService.get(id)
      .subscribe(
        data => {
          this.currentStudent = data;
          this.student_id = data.id;
          console.log(data);
        },
        error =>{
          console.log(error);
        }
      )
  }
}

import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../../../../services/student.service';
import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  currentStudent : Student = null;
  @Input() student : Student;

  constructor(private studentService : StudentService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.student);
 //   this.student = new Student();
  //  this.getStudent(this.route.snapshot.paramMap.get('id'));

  }

  getStudent(id) : void {
    this.studentService.get(id)
      .subscribe(
        data => {
          this.currentStudent = data;
          console.log(data);
        },
        error => {
          console.log(error)
        }
      )
  }

}

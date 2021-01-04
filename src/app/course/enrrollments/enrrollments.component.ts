import { Component, OnInit, Input } from '@angular/core';
import { CourseAttendance } from 'src/app/model/course-attendance.model';
import { Course } from 'src/app/model/course.model';

@Component({
  selector: 'app-course-enrrollments',
  templateUrl: './enrrollments.component.html',
  styleUrls: ['./enrrollments.component.css']
})
export class EnrrollmentsComponent implements OnInit {

  @Input() courseAttendances : CourseAttendance[];
  @Input() course: Course;
  constructor() { }

  ngOnInit(): void {
    console.log("kurs id2 je " + this.course.id)
  }

  addStudent(){
    
  }

}

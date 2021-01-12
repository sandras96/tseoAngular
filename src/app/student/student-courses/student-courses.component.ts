import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/model/course.model';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  @Input() courses : Course[];
  constructor() { }

  ngOnInit(): void {
  }

}

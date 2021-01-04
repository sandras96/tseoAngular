import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/model/course.model';

@Component({
  selector: 'app-course-unit',
  templateUrl: './course-unit.component.html',
  styleUrls: ['./course-unit.component.css']
})
export class CourseUnitComponent implements OnInit {

  @Input() course: Course;
  constructor() { }

  ngOnInit(): void {
  }

}

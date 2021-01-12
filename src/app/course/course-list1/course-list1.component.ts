import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/model/course.model';

@Component({
  selector: 'app-course-list1',
  templateUrl: './course-list1.component.html',
  styleUrls: ['./course-list1.component.css']
})
export class CourseList1Component implements OnInit {

  @Input() public courses : Course[];
  @Output() public courseSelected = new EventEmitter<Course>();

  constructor() { }

  ngOnInit(): void {
  }

  selectCourse(course : Course){
    this.courseSelected.emit(course);
  }
}

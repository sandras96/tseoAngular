import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course.model';

@Component({
  selector: 'app-professor-courses',
  templateUrl: './professor-courses.component.html',
  styleUrls: ['./professor-courses.component.css']
})
export class ProfessorCoursesComponent implements OnInit {

  @Input() courses : Course;
  constructor() { }

  ngOnInit(): void {
    
  }

}

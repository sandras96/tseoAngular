import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';

@Component({
  selector: 'app-course-exams',
  templateUrl: './course-exams.component.html',
  styleUrls: ['./course-exams.component.css']
})
export class CourseExamsComponent implements OnInit {

  @Input() exams : Exam[];
  constructor() { }

  ngOnInit(): void {
  }

}

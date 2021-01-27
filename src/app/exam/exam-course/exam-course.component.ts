import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';

@Component({
  selector: 'app-exam-course',
  templateUrl: './exam-course.component.html',
  styleUrls: ['./exam-course.component.css']
})
export class ExamCourseComponent implements OnInit {

  @Input() exam : Exam;
  constructor() { }

  ngOnInit(): void {
    console.log("exam course")
  }

}

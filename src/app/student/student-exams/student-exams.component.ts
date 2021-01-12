import { Component, OnInit, Input } from '@angular/core';
import { ExamTaking } from 'src/app/model/exam-taking.model';

@Component({
  selector: 'app-student-exams',
  templateUrl: './student-exams.component.html',
  styleUrls: ['./student-exams.component.css']
})
export class StudentExamsComponent implements OnInit {

  @Input() examTakings : ExamTaking[];
  constructor() { }

  ngOnInit(): void {
  }

}

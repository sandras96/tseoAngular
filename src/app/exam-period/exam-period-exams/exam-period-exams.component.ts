import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';

@Component({
  selector: 'app-exam-period-exams',
  templateUrl: './exam-period-exams.component.html',
  styleUrls: ['./exam-period-exams.component.css']
})
export class ExamPeriodExamsComponent implements OnInit {

  @Input() exams : Exam[];
  constructor() { }

  ngOnInit(): void {
  }

}

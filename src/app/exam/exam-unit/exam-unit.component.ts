import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';

@Component({
  selector: 'app-exam-unit',
  templateUrl: './exam-unit.component.html',
  styleUrls: ['./exam-unit.component.css']
})
export class ExamUnitComponent implements OnInit {

  @Input() exam : Exam;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  @Input() exams : Exam[];
  constructor() { }

  ngOnInit(): void {
  }

}

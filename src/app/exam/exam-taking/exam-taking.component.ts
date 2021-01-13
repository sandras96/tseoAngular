import { Component, OnInit, Input } from '@angular/core';
import { ExamTaking } from 'src/app/model/exam-taking.model';

@Component({
  selector: 'app-exam-taking',
  templateUrl: './exam-taking.component.html',
  styleUrls: ['./exam-taking.component.css']
})
export class ExamTakingComponent implements OnInit {

  @Input() examTakings : ExamTaking[];
  constructor() { }

  ngOnInit(): void {
  }

}

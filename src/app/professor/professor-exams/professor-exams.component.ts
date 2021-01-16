import { Component, Input, OnInit } from '@angular/core';
import { ExamTaking } from 'src/app/model/exam-taking.model';

@Component({
  selector: 'app-professor-exams',
  templateUrl: './professor-exams.component.html',
  styleUrls: ['./professor-exams.component.css']
})
export class ProfessorExamsComponent implements OnInit {

  @Input() examtakings : ExamTaking;
  constructor() { }

  ngOnInit(): void {
  }

  removeExamTaking(et){
    
  }
}

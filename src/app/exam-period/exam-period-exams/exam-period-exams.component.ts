import { ExamService } from 'src/app/services/exam.service';
import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';
import { ExamPeriod } from 'src/app/model/exam-period.model';

@Component({
  selector: 'app-exam-period-exams',
  templateUrl: './exam-period-exams.component.html',
  styleUrls: ['./exam-period-exams.component.css']
})
export class ExamPeriodExamsComponent implements OnInit {

  @Input() exams : Exam[];
  @Input() examPeriod : ExamPeriod;
  constructor(private examService : ExamService) { }

  ngOnInit(): void {
  }

  retrieveExams(search){
    this.examService.findByCourseAndExamPeriodId(search,this.examPeriod.id)
      .subscribe(data=>{
        this.exams = data;
      })
  }
}

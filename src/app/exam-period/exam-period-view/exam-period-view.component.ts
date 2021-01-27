import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ExamPeriod } from 'src/app/model/exam-period.model';
import { Exam } from 'src/app/model/exam.model';
import { ExamPeriodService } from 'src/app/services/exam-period.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-period-view',
  templateUrl: './exam-period-view.component.html',
  styleUrls: ['./exam-period-view.component.css']
})
export class ExamPeriodViewComponent implements OnInit {

  examPeriod : ExamPeriod;
  exams : Exam[];

  constructor(private examPeriodService : ExamPeriodService,
              private examService : ExamService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getExamPeriod(this.route.snapshot.paramMap.get('id'));
  }

  getExamPeriod(id){
    this.examPeriodService.get(id)
      .subscribe(
        data=>{
          this.examPeriod = data;
          this.getExams(data.id);
          console.log(data)
        },
        error=>{
          console.log(error)
        }
      )
  }

  getExams(id){
    this.examService.getByExamPeriodId(id)
      .subscribe(
        data=>{
          this.exams = data;
          console.log(data)
        },error=>{
          console.log(error)
        }
      )
  }

}

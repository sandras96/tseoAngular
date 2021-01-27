import { Component, OnInit } from '@angular/core';
import { ExamPeriod } from 'src/app/model/exam-period.model';
import { ExamPeriodService } from 'src/app/services/exam-period.service';

@Component({
  selector: 'app-exam-period',
  templateUrl: './exam-period.component.html',
  styleUrls: ['./exam-period.component.css']
})
export class ExamPeriodComponent implements OnInit {

  examPeriods : ExamPeriod[];

  constructor(private examPeriodService : ExamPeriodService) { }

  ngOnInit(): void {
    this.getExamPeriods();

  }

  getExamPeriods(){
    this.examPeriodService.getAll()
      .subscribe(
        data=>{
          this.examPeriods = data;
          console.log(data)
        }, error =>{
          console.log(error)
        }
      )
  }

  addExamPeriod(examPeriod : ExamPeriod){
    this.examPeriods.push(examPeriod);
  }

  removeExamPeriod(examPeriod : ExamPeriod){
    console.log("remove exam period")
    this.examPeriods = this.examPeriods.filter(ep => ep !== examPeriod);
  }
}

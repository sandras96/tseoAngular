import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';
import { ExamPeriod } from 'src/app/model/exam-period.model';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  currentExam = null;
  currentIndex = -1;
  exams : Observable<Exam[]>;
  examPeriods : Observable<ExamPeriod[]>;

  constructor(private examService : ExamService,
              private router : Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    this.examService.getAll()
    .subscribe(
      data => {
        this.exams = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  refreshList(): void {
    this.reloadData();
    this.currentExam = null;
    this.currentIndex = -1;
  }

  setActiveExam(exam, index): void {  
    this.currentExam = exam;
    this.currentIndex = index;
   
  }

  deleteExam(exam_id : number){
    this.examService.delete(exam_id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error)
      );
  }

  examDetails(exam_id : number){
    this.router.navigate(['exams/', exam_id]);
  }
}

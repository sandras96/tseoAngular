import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { ExamPeriod } from 'src/app/model/exam-period.model';
import { ExamTaking } from 'src/app/model/exam-taking.model';
import { Exam } from 'src/app/model/exam.model';
import { ExamService } from 'src/app/services/exam.service';
import { ExamTakingService } from 'src/app/services/exam-taking.service';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent implements OnInit {

  exam : Exam;
  examPeriod : ExamPeriod;
  examTakings : ExamTaking[];
  course : Course;

  tabIndex = 0;
  constructor(private examService : ExamService,
              private examTakingService : ExamTakingService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getExam(this.route.snapshot.paramMap.get('id'));
  }

  getExam(id){
    this.examService.get(id)
      .subscribe(
        data => {
          this.exam = data;
          console.log(data);
          this.getExamTakings(data.id);
        },
        error => {
          console.log(error)
        }
      )
  }

  getExamTakings(id){
    this.examTakingService.getAllByExamId(id)
      .subscribe(
        data => {
          this.examTakings = data;
          console.log("examtakings: ", data);
        },
        error => {
          console.log(error)
        }
      )
  }
  
  addExamTaking(examTaking : ExamTaking){
    this.examTakings.push(examTaking);
  }

  removeExamTaking(examTaking : ExamTaking){
    this.examTakings = this.examTakings.filter(et => et !== examTaking)
  }

  updateExamTaking(examTaking : ExamTaking){
    let updateItem = this.examTakings.find(this.findIndexToUpdate, examTaking.id);
    console.log("Updated item je ", updateItem)
    let index = this.examTakings.indexOf(updateItem);
    this.examTakings[index] = examTaking;

  }
  findIndexToUpdate(newItem) { 
        return newItem.id === this;
  }

  onTabClick(index){
    this.tabIndex = index;
  }

}

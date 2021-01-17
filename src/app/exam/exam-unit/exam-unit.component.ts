import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Exam } from 'src/app/model/exam.model';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-unit',
  templateUrl: './exam-unit.component.html',
  styleUrls: ['./exam-unit.component.css']
})
export class ExamUnitComponent implements OnInit {

  @Input() exam : Exam;
  constructor(private examService : ExamService, 
              private toastr : ToastrService,
              private router : Router) { }

  ngOnInit(): void {
  }

  updateExam(){
    this.examService.update(this.exam.id, this.exam)
      .subscribe(data=>{
        this.toastr.success('This exam was successfully updated!', 'Success!');
        console.log("Updated exam ", data)
      }, error =>{
        console.log(error)
      })
  }

  deleteExam(){
    this.examService.delete(this.exam.id)
      .subscribe(data=>{
        this.toastr.success('This exam was successfully deleted!', 'Delete');
        this.router.navigate(['/exams']);
      },error=>{
        console.log(error)
      })
  }
}

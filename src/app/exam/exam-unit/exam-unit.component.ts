import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Exam } from 'src/app/model/exam.model';
import { AuthService } from 'src/app/services/auth.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-unit',
  templateUrl: './exam-unit.component.html',
  styleUrls: ['./exam-unit.component.css']
})
export class ExamUnitComponent implements OnInit {
  date;
  @Input() exam : Exam;
  constructor(private examService : ExamService, 
              private toastr : ToastrService,
              private router : Router,
              public authService : AuthService) { }

  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);
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

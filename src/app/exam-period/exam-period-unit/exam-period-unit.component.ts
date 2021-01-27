import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamPeriod } from 'src/app/model/exam-period.model';
import { ExamPeriodService } from 'src/app/services/exam-period.service';

@Component({
  selector: 'app-exam-period-unit',
  templateUrl: './exam-period-unit.component.html',
  styleUrls: ['./exam-period-unit.component.css']
})
export class ExamPeriodUnitComponent implements OnInit {

  @Input() examPeriod : ExamPeriod;
  constructor(private examPeriodService : ExamPeriodService,
              private toastr : ToastrService,
              private router : Router) { }

  ngOnInit(): void {
  }

  updateExamPeriod(){
    this.examPeriodService.update(this.examPeriod.id, this.examPeriod)
      .subscribe(
        data=>{
          this.toastr.success('This exam period was successfully updated!', 'Success!');
          console.log("Updated exam period", data)
        },error=>{
          console.log(error)
        }
      )
  }

  deleteExamPeriod(){
    this.examPeriodService.delete(this.examPeriod.id)
      .subscribe(
        data=>{
          this.toastr.success('This exam period was successfully deleted!', 'Delete');
          this.router.navigate(['/examperiods']);
        }
      )
  }
}

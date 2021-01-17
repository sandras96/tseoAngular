import { ToastrService } from 'ngx-toastr';
import { ExamTakingService } from 'src/app/services/exam-taking.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExamTaking } from 'src/app/model/exam-taking.model';

@Component({
  selector: 'app-student-exams',
  templateUrl: './student-exams.component.html',
  styleUrls: ['./student-exams.component.css']
})
export class StudentExamsComponent implements OnInit {



  @Input() examTakings : ExamTaking[];
  @Output() deleteExamTaking = new EventEmitter<ExamTaking[]>();

  examTaking : ExamTaking = new ExamTaking();
  constructor(private examTakingService : ExamTakingService,
              private toastr : ToastrService) { }

  
  ngOnInit(): void {
   
  }

  removeExamTaking(et){
    this.examTakingService.delete(et.id)
      .subscribe( data => {
        this.deleteExamTaking.emit(et);
        this.toastr.success("This exam from course " +et.exam.course.name+ " was deleted successfully", "Success");
      }, error => {
        console.log(error)
      })

  }



  
}

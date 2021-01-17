import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { ExamPeriod } from 'src/app/model/exam-period.model';
import { Exam } from 'src/app/model/exam.model';
import { ExamPeriodService } from 'src/app/services/exam-period.service';
import { ExamService } from 'src/app/services/exam.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-course-exams',
  templateUrl: './course-exams.component.html',
  styleUrls: ['./course-exams.component.css']
})
export class CourseExamsComponent implements OnInit {

  @Input() exams : Exam[];
  @Input() course : Course;

  @Output() addExam = new EventEmitter<Exam[]>();
  @Output() deleteExam = new EventEmitter<Exam[]>();
  examPeriods : ExamPeriod[];

  constructor(private examService : ExamService,
              private examPeriodService : ExamPeriodService,
              private toastr : ToastrService,
              private modalService: ModalService) { }

  exam : Exam = new Exam();
  ngOnInit(): void {
    this.getExamPeriods();
  }

  getExamPeriods(){
    this.examPeriodService.getAll()
      .subscribe( data => {
        this.examPeriods = data;
        console.log("examPeriods su", data)
      }, error=> {
        console.log(error)
      })
  }


  createExam(epId){
    console.log("Exam za kreiranje je", this.exam, "Kurs id je ", this.course.id, "Exam id je ", epId)
    this.examService.create(this.exam, this.course.id, epId)
      .subscribe( data =>{
        this.exam = data;
        this.addExam.emit(data);
        this.toastr.success("The exam was created susccessfully!", "Success!");
        this.closeModal('createExamModal');
      }, error =>{
        console.log(error)
      })
  }

  removeExam(exam){
    this.examService.delete(exam.id)
      .subscribe(data=>{
        this.deleteExam.emit(exam);


      }, error=>{
        console.log(error)
      })
  }
  

  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
}
}

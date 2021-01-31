import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/model/course.model';
import { ExamPeriod } from 'src/app/model/exam-period.model';
import { Exam } from 'src/app/model/exam.model';
import { CourseService } from 'src/app/services/course.service';
import { ExamPeriodService } from 'src/app/services/exam-period.service';
import { ExamService } from 'src/app/services/exam.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  courses : Course[];
  examPeriods : ExamPeriod[];
  examForm : FormGroup;
  submitted = false;
  date;

  @Input() exams : Exam[];
  @Output() addExam = new EventEmitter<Exam[]>();
  @Output() deleteExam = new EventEmitter<Exam[]>();

  constructor(private examService : ExamService,
              private courseService : CourseService,
              private examPeriodService : ExamPeriodService,
              private modalService: ModalService,
              private toastr : ToastrService) { }

  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);
      this.examForm = new FormGroup({
         course : new FormControl('', Validators.required),
         date : new FormControl('', Validators.required),
         assignment: new FormControl('', Validators.required),
         points : new FormControl('', Validators.required),
         examPeriod : new FormControl('', Validators.required)
       })
  }
  get f() { return this.examForm.controls; }

  onSubmit(){
    this.submitted = true;

   if (this.examForm.invalid) {
       return false;
   }
      this.createExam()
 }
  createExam(){
    console.log("Exam form je ", this.examForm.value)
    this.examService.createExam(this.examForm.value)
    .subscribe(data=>{
      this.addExam.emit(data);
      this.toastr.success('Exam was successfully created!', 'Success!');
      this.closeModal('createExam');
      console.log(data)
    }, error=>{
      console.log(error)
    })
   
  }

  removeExam(exam){
    this.examService.delete(exam.id)
    .subscribe(data=>{
      this.deleteExam.emit(exam);
      this.toastr.success('Exam was successfully deleted!', 'Success!');
    }, error=>{
      console.log(error)
    })
  }

  getCourses(){
    this.courseService.getAll()
      .subscribe(data=>{
        this.courses = data
      })
  }
  getExamPeriods(){
    this.examPeriodService.getAll()
      .subscribe(data=>{
        this.examPeriods = data;
      })
  }
  openModal(id: string) {
    this.getCourses();
    this.getExamPeriods();
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
    this.examForm.reset();
    this.submitted = false;
}
}

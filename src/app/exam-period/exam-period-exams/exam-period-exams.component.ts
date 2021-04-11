import { ExamService } from 'src/app/services/exam.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';
import { ExamPeriod } from './../../model/exam-period.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamPeriodService } from 'src/app/services/exam-period.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/_modal';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course.model';

@Component({
  selector: 'app-exam-period-exams',
  templateUrl: './exam-period-exams.component.html',
  styleUrls: ['./exam-period-exams.component.css']
})
export class ExamPeriodExamsComponent implements OnInit {

  examforDelete : Exam;
  examForm : FormGroup;
  submitted = false;
  courses : Course[];
  date;

  @Input() exams : Exam[];
  @Input() examPeriod : ExamPeriod;
  @Output() addExam = new EventEmitter<Exam[]>();
  @Output() deleteExam = new EventEmitter<Exam[]>();
  constructor(private examService : ExamService,
              private examPeriodService : ExamPeriodService,
              private courseService : CourseService,
              private toastr : ToastrService,
              private modalService: ModalService) { }
  
  
  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);
    this.examForm = new FormGroup({
      course : new FormControl('',Validators.required),
      date : new FormControl('', Validators.required),
      assignment: new FormControl('', Validators.required),
      points : new FormControl('', Validators.required),
      examPeriod : new FormControl(this.examPeriod)
   
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

 getCourses(){
  this.courseService.getAll()
    .subscribe( data => {
      this.courses = data;
      console.log("courses su", data)
    }, error=> {
      console.log(error)
    })
}
 createExam(){
  this.examForm.value.examPeriod = this.examPeriod;
   console.log(this.examForm.value, this.examPeriod)
    this.examService.createExam(this.examForm.value)
      .subscribe(data=>{
        this.addExam.emit(data);
        this.toastr.success('Exam was successfully created!', 'Success!');
        this.closeModal('createExamModal1');
        console.log(data)
    },error=>{
      console.log(error)
    })
  }

  removeExam(exam){
    this.examService.delete(exam.id)
      .subscribe(data=>{
        this.deleteExam.emit(exam);
        this.toastr.success("Exam was successfully deleted!","Success!")
        this.closeModal('deleteModal')
      }, error=>{
        console.log(error)
      })
  }
  

  openModal(id: string) {
    this.modalService.open(id);
    this.getCourses();
}

  closeModal(id: string) {
    this.modalService.close(id);
    this.examForm.reset();
    this.submitted = false;
}
  retrieveExams(search){
    this.examService.findByCourseAndExamPeriodId(search,this.examPeriod.id)
      .subscribe(data=>{
        this.exams = data;
      })
  }

  openModalDelete(id: string, exam) {
    this.modalService.open(id);
    this.examforDelete = exam;
  }
  
  closeModalDelete(id: string) {
    this.modalService.close(id);
  }
}

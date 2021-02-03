import { ExamPeriod } from './../../model/exam-period.model';
import { Course } from './../../model/course.model';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';
import { ExamPeriodService } from 'src/app/services/exam-period.service';
import { ExamService } from 'src/app/services/exam.service';
import { ModalService } from 'src/app/_modal';
import { FormArray, FormControl, FormGroup, Validators, FormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-course-exams',
  templateUrl: './course-exams.component.html',
  styleUrls: ['./course-exams.component.css']
})
export class CourseExamsComponent implements OnInit {

  examForm : FormGroup;
  submitted = false;
  date;
  @Input() exams : Exam[];
  @Input() course : Course;

  @Output() addExam = new EventEmitter<Exam[]>();
  @Output() deleteExam = new EventEmitter<Exam[]>();
  examPeriods : ExamPeriod[];


  constructor(private examService : ExamService,
              private examPeriodService : ExamPeriodService,
              private toastr : ToastrService,
              private modalService: ModalService) { 
               
              }

 
  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);
     this.examForm = new FormGroup({
      course : new FormControl(this.course)
          // id : new FormControl(this.course.id),
          // name : new FormControl(this.course.name),
          // espb : new FormControl(this.course.espb),
          // semester : new FormControl(this.course.semester),
          // deleted : new FormControl(false)
     ,
       date : new FormControl('', Validators.required),
       assignment: new FormControl('', Validators.required),
       points : new FormControl('', Validators.required),
       examPeriod : new FormControl('',Validators.required)
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
  getExamPeriods(){
    this.examPeriodService.getAll()
      .subscribe( data => {
        this.examPeriods = data;
        console.log("examPeriods su", data)
      }, error=> {
        console.log(error)
      })
  }

  
  createExam(){
   console.log("Forma za dodavanje exam-a je ", this.examForm.value)
   this.examService.createExam(this.examForm.value)
    .subscribe(data=>{
      this.addExam.emit(data);
      this.toastr.success('Exam was successfully created!', 'Success!');
      this.closeModal('createExamModal');
      console.log(data)
    }, error=>{
      console.log(error)
    })
   
    // console.log("Exam za kreiranje je", this.exam, "Kurs id je ", this.course.id, "Exam id je ", epId)
    // this.examService.create(this.exam, this.course.id, epId)
    //   .subscribe( data =>{
    //     this.exam = data;
    //     this.addExam.emit(data);
    //     this.toastr.success("The exam was created susccessfully!", "Success!");
    //     this.closeModal('createExamModal');
    //   }, error =>{
    //     console.log(error)
    //   })
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
    this.getExamPeriods();
}

  closeModal(id: string) {
    this.modalService.close(id);
    this.examForm.reset();
    this.submitted = false;
}

retrieveExams(search){
  this.examService.findByExamPeriodAndCourseId(search, this.course.id)
    .subscribe(data=>{
      this.exams = data;
    })
}
}

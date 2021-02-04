import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/model/course.model';
import { ExamPeriod } from 'src/app/model/exam-period.model';
import { Exam } from 'src/app/model/exam.model';
import { Professor } from 'src/app/model/professor.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { ExamPeriodService } from 'src/app/services/exam-period.service';
import { ExamService } from 'src/app/services/exam.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
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
  professor : Professor;
  roles : string[];
  examForDelete : Exam;

  @Input() exams : Exam[];
  @Output() addExam = new EventEmitter<Exam[]>();
  @Output() deleteExam = new EventEmitter<Exam[]>();

  constructor(private examService : ExamService,
              private courseService : CourseService,
              private examPeriodService : ExamPeriodService,
              private professorService : ProfessorService,
              private tokenStorage : TokenStorageService,
              private modalService: ModalService,
              private toastr : ToastrService,
              public authService : AuthService) { }

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
      this.closeDeleteModal('deleteModal');
      this.toastr.success('Exam was successfully deleted!', 'Success!');
    }, error=>{
      console.log(error)
    })
  }

  getCourses(){
    const user = this.tokenStorage.getUser();
    this.roles = user.authorities;
    this.professor = JSON.parse(localStorage.getItem('currentProfessor'));
    if(this.professor!=null){
      this.professorService.getAllCoursesByProfId(this.professor.id)
        .subscribe(data=>
          this.courses = data)
    }else if(this.roles.includes("ADMIN")){
      this.courseService.getAll()
      .subscribe(data=>
        this.courses = data
      )
    }
    
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
openDeleteModal(id: string, exam){
  console.log("exam za brisanje", exam)
  this.modalService.open(id);
  this.examForDelete = exam;
} 
closeDeleteModal(id: string) {
  this.modalService.close(id);
}
retrieveExams(search, param){
  console.log("serach je ", search , "a param by je ", param)
  if(search!=""){
  if(param=="examperiod"){
    this.searchByExamPeriod(search);
  }
  if(param=="course"){
    this.searchByCourse(search);
  }
}
else{
  this.getExams();

}
  }
  getExams(){
    this.examService.getAll().subscribe(data=>this.exams=data);
   }
 searchByExamPeriod(search){
  this.examService.findByExamPeriod(search)
    .subscribe(data=>{
        this.exams =data;
         console.log(data)
       })
 }

 searchByCourse(search){
  this.examService.findByCourse(search)
  .subscribe(data=>{
      this.exams =data;
       console.log(data)
     })
 }
}

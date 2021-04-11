import { Observable } from 'rxjs';
import { ExamTakingService } from 'src/app/services/exam-taking.service';
import { Course } from 'src/app/model/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service';
import { ExamTaking } from 'src/app/model/exam-taking.model';
import { DocumentService } from 'src/app/services/document.service';
import { Payment } from 'src/app/model/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  student : Student;
  courses : Course[] = [];
  examTakings : ExamTaking[];
  documents : Document[];
  payments : Payment[];

  tabIndex = 0;

  constructor(private studentService : StudentService,
              private courseService : CourseService,
              private paymentService : PaymentService,
              private examTakingService : ExamTakingService,
              private uploadService: UploadFileService,
              private route : ActivatedRoute,
              private toastr: ToastrService,
              private router : Router) { }

  ngOnInit(): void {
    this.getStudent(this.route.snapshot.paramMap.get('id'));
    
  }

  getStudent(id){
    this.studentService.get(id)
      .subscribe(
        data=>{
          this.student = data;
          this.getCourses(data.id);
          this.getFiles(data.id);
          this.getPayments(data.id);
          this.getExamTakings(data.id);
        }, 
        error => {
          this.toastr.error("The Student not found!","Error!")
          this.router.navigate(['students']);
          console.log(error);
        }
      )
  }
  getCourses(id){
    this.courseService.getByStudentId(id)
      .subscribe(
        data => {
          this.courses = data;
          console.log(data);
        },
        error => {
          console.log(error)
        }
      )
  }

  getFiles(id){
    this.uploadService.getFiles(id)
      .subscribe(data=>{
        this.documents = data;
        console.log(data);
      },error => {
        console.log(error)
      })
  }
  getPayments(id){
    this.paymentService.getPaymentsByStudentId(id)
      .subscribe(
        data => {
          this.payments = data;
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
  }

  getExamTakings(id){
    this.examTakingService.getAllByStudentId(id)
      .subscribe( data=> {
        this.examTakings = data;
        console.log(data);
      }, error=>{
        console.log(error)
      })
  }
  onTabClick(index){
    this.tabIndex = index;
   
    
  }

  removeCourse(course : Course){
    console.log("removecoure ", course)
    this.courses = this.courses.filter(c => c !== course);
    console.log("kourses", this.courses)
  }

  addCourse(id : number){
    this.courseService.get(id).subscribe(
      data=>{
        this.courses = [...this.courses, data]
      }
    )
  }
  uploadDocument(document : Document){
    
  }
  removeDocument(document : Document){
    console.log("removeDoc", document)
    this.documents = this.documents.filter(d => d !== document);
  } 
 
  addPayment(payment : Payment){
    this.payments.push(payment);
  }
  removePayment(payment : Payment){
    console.log("removePayment", payment)
    this.payments = this.payments.filter(p => p!== payment);
  }

  // removeExamTaking(et : ExamTaking){
  //   console.log("remove Exam Taking", et)
  //   this.examTakings = this.examTakings.filter(e => e!==et);
  // }
  
}

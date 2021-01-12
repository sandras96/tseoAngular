import { Course } from 'src/app/model/course.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { CourseAttendance } from 'src/app/model/course-attendance.model';
import { CourseService } from 'src/app/services/course.service';
import { ExamTaking } from 'src/app/model/exam-taking.model';
import { DocumentService } from 'src/app/services/document.service';
import { Payment } from 'src/app/model/payment.model';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  student : Student;
  courses : Course[];
  examTakings : ExamTaking[];
  documents : Document[];
  payments : Payment[];

  tabIndex = 0;

  constructor(private studentService : StudentService,
              private courseService : CourseService,
              private documentService : DocumentService,
              private paymentService : PaymentService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getStudent(this.route.snapshot.paramMap.get('id'));
    this.getCourses(this.route.snapshot.paramMap.get('id'));
    this.getDocuments(this.route.snapshot.paramMap.get('id'));
    this.getPayments(this.route.snapshot.paramMap.get('id'));
  }

  getStudent(id){
    this.studentService.get(id)
      .subscribe(
        data=>{
          this.student = data;
        }, 
        error => {
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
  getDocuments(id){
    this.documentService.getDocumentsByStudentId(id)
      .subscribe(
        data => {
          this.documents = data;
          console.log(data)
        }, 
        error => {
          console.log(error)
        }
      )
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
  onTabClick(index){
    this.tabIndex = index;
  }

}

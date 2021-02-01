import { ExamTakingService } from 'src/app/services/exam-taking.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';
import { Professor } from 'src/app/model/professor.model';
import { Student } from 'src/app/model/student.model';
import { User } from 'src/app/model/user.model';
import { ExamService } from 'src/app/services/exam.service';
import { ExamTaking } from 'src/app/model/exam-taking.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  student : Student;
  professor : Professor;
  user : User;
  exams : Exam[];

  constructor(private examService : ExamService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.getData();
  }

  getAllExams(){
    this.examService.getAll()
      .subscribe(
        data=>{
          this.exams = data;
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
  }
  getData(){
    
    if(this.authService.userRole()=="admin"){
      this.getAllExams();
    }
     if(this.authService.userRole()=="student"){
      this.student = JSON.parse(localStorage.getItem('currentStudent'))
      this.getStudentExams(this.student);
    }
     if(this.authService.userRole()=="professor"){
      this.professor = JSON.parse(localStorage.getItem('currentProfessor'))
       this.getProfessorExams(this.professor);
    }
  }

  getStudentExams(s){
   
    this.examService.getByStudentId(s.id)
      .subscribe(data=>{
        this.exams = data;
        console.log(data);
      },
      error => {
        console.log(error)
      }
      )
  }

  getProfessorExams(p){
    this.examService.getByProfessorId(p.id)
      .subscribe(data=>{
        this.exams = data;
        console.log("exam profff su ", data)
      })
  }
  createExam(exam : Exam){
    this.exams.push(exam);
  }
  removeExam(exam : Exam){
    this.exams = this.exams.filter(e => e!==exam);
  }
}

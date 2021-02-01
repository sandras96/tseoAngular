import { TokenStorageService } from './../../services/token-storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Student } from 'src/app/model/student.model';
import { User } from 'src/app/model/user.model';
import { StudentService } from 'src/app/services/student.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/model/professor.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  student : Student;
  professor : Professor;
  user : User;
  public courses : Course[];
  public course : Course;

 

  constructor(private courseService : CourseService,
              private tokenStorage : TokenStorageService,
              private authService : AuthService,
              private professorService : ProfessorService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    
    if(this.authService.userRole()=="admin"){
      this.getAllCourses();
    }
     if(this.authService.userRole()=="student"){
      this.student = JSON.parse(localStorage.getItem('currentStudent'))
      this.getStudentCourses(this.student);
    }
     if(this.authService.userRole()=="professor"){
      this.professor = JSON.parse(localStorage.getItem('currentProfessor'))
      this.getProfessorCourses(this.professor);
    }
  }

  getAllCourses(){
    this.courseService.getAll()
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

 
  getStudentCourses(s){
   
    this.courseService.getByStudentId(s.id)
      .subscribe(data=>{
        this.courses = data
      },
      error => {
        console.log(error)
      }
      )
  }

getProfessorCourses(p){
  this.professorService.getAllCoursesByProfId(p.id)
    .subscribe(data=>{
      this.courses = data;
      console.log("kursevi profesora su ", data)
    },
    error => {
      console.log(error)
    }
    )
}
  addCourse(course : Course){
    this.courses.push(course);
  }
  deleteCourse(course : Course){
    this.courses = this.courses.filter(c => c!== course);
  }

  
}


import { CourseAttendance } from './../../model/course-attendance.model';
import { CourseAttendanceService } from 'src/app/services/course-attendance.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Course } from 'src/app/model/course.model';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service';
import { filter, map } from 'rxjs/operators'; 
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-course-enrrollments',
  templateUrl: './enrrollments.component.html',
  styleUrls: ['./enrrollments.component.css']
})

export class EnrrollmentsComponent implements OnInit {

 
  @Input() course: Course;
  @Input() courseAttendances : CourseAttendance[];
  
  courseStudents : Student[];
  filteredStudents : Student[];
  studentsAll: Student[];
  courseAttendance : CourseAttendance;
  form: FormGroup;
  studentId : number;
 // studentsAll: any = [];
  
 @Output()
  addStudent = new EventEmitter<CourseAttendance>();

 // @Output() change  = new EventEmitter<Student[]>();


  constructor(
              private courseAttendanceService : CourseAttendanceService,
              private studentService : StudentService,
              private courseService : CourseService) { 

               
              }

                 

  ngOnInit(): void {
    this.getStudents();
    console.log("kurs id2 je " + this.course.id)
  }

  // getStudents(){
  //   this.studentService.getAll()
  //     .subscribe( data => {
  //       this.studentsAll = data;
  //       if(this.courseAttendances.length<0){
  //         return this.studentsAll = this.filteredStudents;
  //       }
  //       this.courseAttendances.forEach(element => {
  //         console.log("ELEMENT JE " , element.student.id)
  //         data.forEach(element2 => {
  //           console.log("DATA ELEMENT 2", element2.id)
  //           if(element.student.id != element2.id){
  //             this.filteredStudents.push(element2);
  //             console.log("filtered students lista je ", element2)
  //           }
  //         });
        
          
  //       });
  //      return this.filteredStudents;
       
  //     },
  //     error => {
  //       console.log(error)
  //     })
  // }
  getFilteretStudents(){
    this.courseAttendanceService.getStudentsNotInCourse(this.course.id)
      .subscribe(
        data => {
          this.filteredStudents = data;
          console.log("FILTERED STUDENTSSSS", data)
        },
        error => {
          console.log(error)
        }
      )
  }
 getStudents(){
   this.studentService.getAll()
    .subscribe( data =>{
      this.studentsAll = data;
    }, error =>{
      console.log(error)
    })
 }

  add(sId){
    this.courseAttendanceService.create(this.course.id, sId)
      .subscribe(data => {
        
        
        
        this.courseAttendance = data;
        this.addStudent.emit(data)
        console.log("CA JE:" + data.id);
        
      },
      error => {
        console.log(error)
      }
      )}
}
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CourseAttendance } from './../../model/course-attendance.model';
import { CourseAttendanceService } from 'src/app/services/course-attendance.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Course } from 'src/app/model/course.model';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service';
import { filter, map } from 'rxjs/operators'; 
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-enrrollments',
  templateUrl: './enrrollments.component.html',
  styleUrls: ['./enrrollments.component.css']
})

export class EnrrollmentsComponent implements OnInit {

 
  @Input() course: Course;
  @Input() courseAttendances : CourseAttendance[];
  
  courseStudents : Student[];
  filteredStudents : Student[] = [];
  studentsAll: Student[];
  courseAttendance : CourseAttendance;
 
  
 @Output() addStudent = new EventEmitter<CourseAttendance[]>();
 @Output() deleteStudent = new EventEmitter<CourseAttendance[]>();


  constructor(private courseAttendanceService : CourseAttendanceService,
              private studentService : StudentService,
              private route : ActivatedRoute,
              private toastr : ToastrService,
              public authService : AuthService) {}

                 

  ngOnInit(): void {
    this.getStudents();
    console.log("kurs id2 je " + this.course.id)
  }

 getStudents(){
   this.studentService.getAll()
    .subscribe( data =>{
      this.studentsAll = data;
      this.getFilteredStudents();
    }, error =>{
      console.log(error)
    })
 }

 getFilteredStudents(){
   this.filteredStudents = [];
   this.studentsAll.forEach(student =>{
     let counter = 0;
     this.courseAttendances.forEach(ca =>{
       if(ca.student.id == student.id){
         counter++
       }
     })
     if(counter ===0){
       this.filteredStudents.push(student)
     }
   })

 }

 arrayRemove (array, id) { 
  return array.filter((ele) => { 
      return ele.id != id; 
  });
}
  add(sId){
    this.courseAttendanceService.create(this.course.id, sId)
      .subscribe(data => {
        this.courseAttendance = data;
        this.addStudent.emit(data);
        this.filteredStudents = this.arrayRemove(this.filteredStudents, data.student.id)
        console.log("CA JE:" + data.id);
      },
      error => {
        console.log(error)
      }
      )}

  removeStudent(ca){
    this.courseAttendanceService.delete(ca.student.id, this.course)
      .subscribe(data=>{
        console.log("DATA JE ", data)
        this.deleteStudent.emit(ca);
        this.filteredStudents.push(ca.student);
      },
      error =>{
        console.log(error)
      })
  }
}
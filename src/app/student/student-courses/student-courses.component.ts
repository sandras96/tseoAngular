import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CourseAttendanceService } from 'src/app/services/course-attendance.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  @Input() courses : Course[];
  
  coursesAll : Course[];
  studentId : number;
  @Output() deleteCourse  = new EventEmitter<Course[]>();
  @Output() addCourse  = new EventEmitter<Course[]>();

  constructor(private courseAttendanceService : CourseAttendanceService,
              private courseService : CourseService,
              private route : ActivatedRoute,
              private toastr: ToastrService) { }
                 
  ngOnInit(): void {
   this.studentId = this.getStudentId(this.route.snapshot.paramMap.get('id'));
   this.getCourses();
  }

  removeCourse(course){
    console.log("KKURS JE " , course)
    this.courseAttendanceService.delete(this.studentId, course)
      .subscribe(data=>{
        this.deleteCourse.emit(course);
        this.toastr.success("Course " +course.name+ " was successfully removed!", "Success")
      }, error => {
        console.log(error)
      })
  }

  getStudentId(id): number{
    return id;
  }

  getCourses(){
    console.log("GET COURSES")
    this.courseService.getAll()
      .subscribe(data => {
        this.coursesAll =data;
      },error=>{console.log(error)})
  }

  signStudent(cId){
    console.log("Sign student", this.studentId)
    console.log("Sign course", cId)
    this.courseAttendanceService.create(cId, this.studentId)
    .subscribe(data => {
      this.addCourse.emit(cId)
      console.log("CA JE:" + data.id);
      
    },
    error => {
      this.toastr.error("Student already enrolled on this course", "Error")
      console.log(error)
    }
    )}
  }


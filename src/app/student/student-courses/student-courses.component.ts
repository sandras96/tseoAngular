import { ModalService } from './../../_modal/modal.service';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CourseAttendanceService } from 'src/app/services/course-attendance.service';
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/model/professor.model';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  @Input() courses : Course[];
  
  professors : Professor[];
  coursesAll : Course[];
  filteredCourses : any[] = [];
  studentId : number;
  @Output() deleteCourse  = new EventEmitter<Course[]>();
  @Output() addCourse  = new EventEmitter<Course[]>();

  constructor(private courseAttendanceService : CourseAttendanceService,
              private courseService : CourseService,
              public authService : AuthService,
              private route : ActivatedRoute,
              private toastr: ToastrService,
              private modalService : ModalService,
              private professorService : ProfessorService) { }
                 
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
        this.filteredCourses.push(course)
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
        this.coursesAll = data;
        this.getFilteredCourses();
      },error=>{console.log(error)})
  }

  signStudent(cId){
    console.log("Sign student", this.studentId)
    console.log("Sign course", cId)
    this.courseAttendanceService.create(cId, this.studentId)
    .subscribe(data => {
      this.addCourse.emit(cId)
      this.filteredCourses = this.arrayRemove(this.filteredCourses, cId);
      console.log("CA JE:" + data.id);
      
    },
    error => {
      console.log(error)
    }
    )}

    getFilteredCourses () {
      this.filteredCourses = []
      this.coursesAll.forEach( course => {
        let counter = 0
        this.courses.forEach( c => {
          if (c.id === course.id) {
            counter++
          }
        })
        if (counter === 0) {
          this.filteredCourses.push(course)
        }
      })
    }

    arrayRemove (array, id) { 
      return array.filter((ele) => { 
          return ele.id != id; 
      });
  }

  openProfModal(id: string, courseId) {
    this.modalService.open(id);
    this.getProfessors(courseId)
  }
  getProfessors(id){
    this.professorService.getAllByCourseId(id).subscribe(data=>{
      this.professors = data;
    console.log(data)
  });
  }

  closeModal(id: string) {
    this.modalService.close(id);
}
  }


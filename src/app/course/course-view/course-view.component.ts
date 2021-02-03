import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CourseAttendance } from 'src/app/model/course-attendance.model';
import { CourseAttendanceService } from 'src/app/services/course-attendance.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/model/professor.model';
import { Exam } from 'src/app/model/exam.model';
import { switchMap } from 'rxjs/operators';
import { Student } from 'src/app/model/student.model';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  course : Course;
  public courseAttendances : CourseAttendance[] = [];
  professors : Professor[];
  public students : Student[] = [];
  exams : Exam[];


  tabIndex = 0;
  constructor(private courseService : CourseService,
              private courseAttendancesService : CourseAttendanceService,
              private professorService : ProfessorService,
              private route : ActivatedRoute,
              private toastr : ToastrService,
              private router : Router) { }

  ngOnInit(): void {
    this.getCourse(this.route.snapshot.paramMap.get('id'));
  }

  getCourse(id){
    this.courseService.get(id)
      .subscribe(
        data => {
          this.course = data;
          console.log("course je:" + data)
          this.getEnrollments(data.id);
          this.getProfessors(data.id);
          this.getExams(data.id);
        },
        error => {
          this.toastr.error("The course not found!","Error!")
          this.router.navigate(['courses']);
          console.log(error)
        }
      )
  }

  getExams(id){
    this.courseService.getExams(id)
      .subscribe(
        data => {
          this.exams = data;
          console.log("exams ", data)
        },
        error => {
          console.log(error)
        }
      )
  }
  getEnrollments(id){
    this.courseAttendancesService.getAllByCourseId(id)
      .subscribe(
        data => {
          this.courseAttendances = data;
          console.log("enrollments " , data);
        }, 
        error => {
          console.log(error)
        }
      )
  }
  // getEnrollments(id){
  //     this.courseService.getStudents(id)
  //       .subscribe(
  //         data => {
  //           this.students = data;
  //           console.log("studenti suu" + data)
  //         }
  //       )
  // }

  getProfessors(id){
    this.professorService.getAllByCourseId(id)
      .subscribe(
        data => {
          this.professors = data;
          console.log("professors " + data);
        }, 
        error => {
          console.log(error)
        }
      )
  }
  onTabClick(index){
    this.tabIndex = index;
  }


  hh(ca : CourseAttendance) {
    console.log("EVENT JE " + ca)
    this.courseAttendances = [...this.courseAttendances, ca];
    console.log('TCL: EventComponent -> hh -> this.students', this.students);
   // this.students.push(student);
  }

  removeStudent(courseAttendance : CourseAttendance){
    this.courseAttendances = this.courseAttendances.filter(ca => ca !== courseAttendance)
    
  }

  createExam(exam : Exam){
    console.log("exam pushovan je ", exam)
    this.exams.push(exam);
  }

  deleteExam(exam:Exam){
    this.exams = this.exams.filter(e => e!==exam);
  }
  removeProfessor(professor : Professor){
    this.professors = this.professors.filter(p => p !==professor);
  }
  addProfessor(professor : Professor){
    this.professors.push(professor);
  }
}

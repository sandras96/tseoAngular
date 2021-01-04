import { CourseService } from 'src/app/services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CourseAttendance } from 'src/app/model/course-attendance.model';
import { CourseAttendanceService } from 'src/app/services/course-attendance.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/model/professor.model';
import { Exam } from 'src/app/model/exam.model';


@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  course : Course;
  courseAttendances : CourseAttendance[];
  professors : Professor[];
  exams : Exam[];

  tabIndex = 0;
  constructor(private courseService : CourseService,
              private courseAttendancesService : CourseAttendanceService,
              private professorService : ProfessorService,
              private route : ActivatedRoute) { }

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
          console.log(error)
        }
      )
  }

  getExams(id){
    this.courseService.getExams(id)
      .subscribe(
        data => {
          this.exams = data;
          console.log("exams " + data)
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
          console.log("enrollments " + data);
        }, 
        error => {
          console.log(error)
        }
      )
  }

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
}

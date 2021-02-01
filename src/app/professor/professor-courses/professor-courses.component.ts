import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/model/course.model';
import { Professor } from 'src/app/model/professor.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-courses',
  templateUrl: './professor-courses.component.html',
  styleUrls: ['./professor-courses.component.css']
})
export class ProfessorCoursesComponent implements OnInit {

 
  coursesAll : Course[];
  filteredCourses : any[] = [];

  @Input() courses : Course[];
  @Input() professor : Professor;
  @Output() addCourse = new EventEmitter<Course[]>();
  @Output() deleteCourse = new EventEmitter<Course[]>();
  constructor(private professorService : ProfessorService,
              private courseService : CourseService,
              private route : ActivatedRoute,
              private toastr: ToastrService,
              public authService : AuthService) { }

  ngOnInit(): void {
   
    this.getAllCourses();
  }

  getAllCourses(){
    this.courseService.getAll()
      .subscribe(data=>{
        this.coursesAll = data;
        this.getFilteredCourses();

      },error =>{
        console.log(error)
      })
  }

  signProfessor(courseId){
    this.professorService.updateCourse(this.professor.id, courseId,this.professor)
      .subscribe(data=>{
        this.addCourse.emit(courseId);
        this.filteredCourses = this.arrayRemove(this.filteredCourses, courseId);
        console.log("Update kursevi za profesora ", data)
      })
  }
  removeCourse(course){
   this.professorService.removeCourseProfessor(this.professor.id, course.id)
    .subscribe(data=> {
      this.deleteCourse.emit(course);
      this.toastr.success("Course " +course.name+ " was successfully removed!", "Success")
      this.filteredCourses.push(course);
      console.log("RemoveCourseProfessor")
    }, error => {
      console.log(error)
    })
  }

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
}

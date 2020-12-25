import { Router } from '@angular/router';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { Observable } from "rxjs";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  currentCourse = null;
  currentIndex = -1;
  courses : Observable<Course[]>;
  name = '';

  constructor(private courseService : CourseService,
              private router : Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    this.courseService.getAll()
    .subscribe(
      data => {
        this.courses = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  
  }
  refreshList(): void {
  this.reloadData();
    this.currentCourse = null;
    this.currentIndex = -1;
  }

 setActiveCourse(course, index): void {  
    this.currentCourse = course;
 this.currentIndex = index;
  }

  deleteCourse(course_id : number){
    this.courseService.delete(course_id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error)
      );
  }

  courseDetails(course_id : number){
    this.router.navigate(['courses/', course_id]);
  }

  searchName(): void {
    this.courseService.findByName(this.name)
      .subscribe(
        data => {
          this.courses = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}



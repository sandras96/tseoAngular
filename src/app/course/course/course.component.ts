import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public courses : Course[];
  public course : Course;

  constructor(private courseService : CourseService,
              private router : Router) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(){
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

  selected(course : any){
    this.course = course;
    this.router.navigate(['[/course-view/:{{this.course.id}}']);
    console.log("Course selected: ", course)
  }
}


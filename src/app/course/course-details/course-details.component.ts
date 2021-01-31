import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/course.model';
import { Student } from 'src/app/model/student.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course_id : number;
  course : Course;
  currentCourse = null;

  
  constructor(private route: ActivatedRoute,
    private router : Router,
    private courseService : CourseService) { }

  ngOnInit(): void {
    this.course = new Course();
  
    this.getCourse(this.route.snapshot.paramMap.get('id'));
    
  }


    getCourse(id): void {
      this.courseService.get(id)
        .subscribe(
          data => {
            this.currentCourse = data;
            
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }
    

    updateCourse(): void {
      this.courseService.update(this.currentCourse.id, this.currentCourse)
        .subscribe(
          response => {
            console.log(response);
           
            
          },
          error => {
            console.log(error);
          });
    }
    deleteCourse(): void {
      this.courseService.delete(this.currentCourse.id)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/courses']);
          },
          error => {
            console.log(error);
          });
    }
    list(){
      this.router.navigate(['courses']); }
  }
  
 

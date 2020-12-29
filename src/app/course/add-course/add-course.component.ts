import { Router } from '@angular/router';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  course : Course = new Course();
  submitted = false;
  
  constructor(private courseService : CourseService,
              private router : Router) { }

  
  ngOnInit() {
  }

  newCourse(): void {
    this.submitted = false;
    this.course = new Course();
  //  getSemester();
  }

  save() {
    this.courseService
      .create(this.course)
        .subscribe(data => {
          console.log(data);
          this.course = new Course();
          this.goToList();
        },
        error => console.log(error)
        );
  }

  onSubmit(){
    this.submitted = true;
    this.save();
  }

  goToList(){
    this.router.navigate(['/courses']);
  }

 getSemester(){

 }
}

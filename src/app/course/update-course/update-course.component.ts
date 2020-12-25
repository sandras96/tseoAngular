import { CourseService } from './../../services/course.service';
import { Course } from './../../model/course.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  course_id: number;
  course: Course;
  submitted = false;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private courseService : CourseService) { }

  ngOnInit(): void {
    this.course = new Course();
    this.submitted = false;
   
    this.getCourse(this.route.snapshot.paramMap.get('course_id'));
    console.log("curs id: "+ this.course)
  }

  getCourse(id): void {
    this.courseService.get(id)
      .subscribe(
        data => {
          this.course = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  updateCourse(){
    this.courseService.update(this.course_id, this.course)
      .subscribe(data => {
        console.log(data);
        this.course = new Course();
        this.goToList();
      }, error => console.log(error, this.course));
  }

  onSubmit(){
    this.submitted = true;
    this.updateCourse();
  }

  goToList(){
    this.router.navigate(['/courses']);
  }

}

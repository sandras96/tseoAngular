import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-unit',
  templateUrl: './course-unit.component.html',
  styleUrls: ['./course-unit.component.css']
})
export class CourseUnitComponent implements OnInit {

  @Input() course: Course;
  constructor(private courseService : CourseService, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  updateCourse(){
    this.courseService.update(this.course.id, this.course)
      .subscribe(data =>{
        this.toastr.success('Course was successfully updated!', 'Success')
        console.log("Updated course", data)
      },error =>{
        console.log(error)
      })
  }

}

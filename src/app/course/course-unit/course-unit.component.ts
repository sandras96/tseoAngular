import { ModalService } from 'src/app/_modal';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-unit',
  templateUrl: './course-unit.component.html',
  styleUrls: ['./course-unit.component.css']
})
export class CourseUnitComponent implements OnInit {

  @Input() course: Course;
  constructor(private courseService : CourseService,
             private toastr : ToastrService,
             public authService : AuthService,
             private modalService : ModalService,
             private router : Router) { }

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

  deleteCourse(){
    this.courseService.delete(this.course.id)
      .subscribe(data=>{
        this.toastr.success("Course "+this.course.name+" was successfully deleted!", "Success!");
        this.router.navigate(['courses']);
      })
  }
  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
}

}
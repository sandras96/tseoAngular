import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { ModalService } from 'src/app/_modal';
@Component({
  selector: 'app-course-list1',
  templateUrl: './course-list1.component.html',
  styleUrls: ['./course-list1.component.css']
})
export class CourseList1Component implements OnInit {

  @Input() public courses : Course[];
  @Output() addCourse = new EventEmitter<Course[]>();
  @Output() deleteCourse = new EventEmitter<Course[]>();
  course : Course = new Course();

  constructor( private modalService: ModalService,
               private courseService : CourseService,
               private toastr : ToastrService) { }

  ngOnInit(): void {
  }

 

   newCourse(): void {
   
    this.course = new Course();
  //  getSemester();
  }

  save() {
    this.courseService
      .create(this.course)
        .subscribe(data => {
          console.log(data);
          this.course = new Course();
          this.addCourse.emit(data);
          this.toastr.success('Course '+data.name+' was successfully created!', 'Success!')
          this.closeModal('createCourseModal');
         
        },
        error => console.log(error)
        );
  }

  onSubmit(){
    this.save();
  }

  removeCourse(course){
    this.courseService.delete(course.id)  
      .subscribe(data=>{
        this.deleteCourse.emit(course);
        this.toastr.success('Course '+course.name+' was successfully deleted!', 'Success!')
      })
  }

  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
}
}

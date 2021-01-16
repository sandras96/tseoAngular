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
  @Output() public courseSelected = new EventEmitter<Course>();

  course : Course = new Course();

  constructor( private modalService: ModalService,
               private courseService : CourseService) { }

  ngOnInit(): void {
  }

  selectCourse(course : Course){
    this.courseSelected.emit(course);
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
         
        },
        error => console.log(error)
        );
  }

  onSubmit(){
    
    this.save();
  }
  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
}
}

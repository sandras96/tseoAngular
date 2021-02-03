import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { ModalService } from 'src/app/_modal';
import { Router } from '@angular/router';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/model/professor.model';
@Component({
  selector: 'app-course-list1',
  templateUrl: './course-list1.component.html',
  styleUrls: ['./course-list1.component.css']
})
export class CourseList1Component implements OnInit {

  professors : Professor[];
  courseForDelete : Course;
  @Input() public courses : Course[];
  @Output() addCourse = new EventEmitter<Course[]>();
  @Output() deleteCourse = new EventEmitter<Course[]>();
  course : Course = new Course();

  constructor( private modalService: ModalService,
               private courseService : CourseService,
               private professorService : ProfessorService,
               public authService : AuthService,
               private toastr : ToastrService,
               private router : Router) { }

  ngOnInit(): void {
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
        console.log(data)
        this.deleteCourse.emit(course);
        this.closeModal('deleteModal');
       this.toastr.success('Course '+course.name+' was successfully deleted!', 'Success!')
      })
  }

  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
}


retrieveCourses(search, param){
  console.log("serach je ", search , "a param by je ", param)
  if(search!=""){
    if(param=="name"){
      this.searchByName(search);
    }
    if(param=="semester"){
      this.searchBySemester(search);
    }
    if(param=="espb"){
      this.searchByEspb(search);
    }
  }
  else{
    this.getCourses();
  }
 }
 getCourses(){
   this.courseService.getAll().subscribe(data=>this.courses=data);
 }

 searchByName(search){
  this.courseService.findByName(search)
    .subscribe(data=>{
        this.courses =data;
         console.log(data)
       })
 }

 searchBySemester(search){
  this.courseService.findBySemester(search)
  .subscribe(data=>{
      this.courses =data;
       console.log(data)
     })
 }

 searchByEspb(search){
  this.courseService.findByEspb(search)
  .subscribe(data=>{
      this.courses =data;
       console.log(data)
     })
 }

 openProfModal(id: string, courseId) {
  this.modalService.open(id);
  this.getProfessors(courseId)
}
getProfessors(id){
  this.professorService.getAllByCourseId(id).subscribe(data=>{
    this.professors = data;
  console.log(data)
});
}
openDeleteModal(id: string, course){
  console.log("kurs za brisanje", course)
  this.modalService.open(id);
  this.courseForDelete = course;
}
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/model/course.model';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-courses',
  templateUrl: './professor-courses.component.html',
  styleUrls: ['./professor-courses.component.css']
})
export class ProfessorCoursesComponent implements OnInit {

  professorId : number;
  @Input() courses : Course;
  @Output() deleteCourse = new EventEmitter<Course[]>();
  constructor(private professorService : ProfessorService,
              private route : ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.professorId = this.getProfessorId(this.route.snapshot.paramMap.get('id'));
  }

  removeCourse(course){
   this.professorService.removeCourseProfessor(this.professorId, course.id)
    .subscribe(data=> {
      this.deleteCourse.emit(course);
      console.log("RemoveCourseProfessor")
    }, error => {
      console.log(error)
    })
  }
  getProfessorId(id): number{
    return id;
  }
}

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Professor } from 'src/app/model/professor.model';
import { ProfessorService } from 'src/app/services/professor.service';
import { Course } from 'src/app/model/course.model';
import { ExamTaking } from 'src/app/model/exam-taking.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-professor-view',
  templateUrl: './professor-view.component.html',
  styleUrls: ['./professor-view.component.css']
})
export class ProfessorViewComponent implements OnInit {

  professor : Professor;
  courses : Course[];
  examtakings : ExamTaking[];
  user : User;

  
  tabIndex = 0;
  

  

  constructor(private professorService: ProfessorService,
              private courseService : CourseService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getProfessor(this.route.snapshot.paramMap.get('id'));
    this.getCourses(this.route.snapshot.paramMap.get('id'));
    this.getExamTakings(this.route.snapshot.paramMap.get('id'));
    
  }

  getProfessor(id){
    this.professorService.get(id)
      .subscribe(
        data =>{
          this.professor = data;
      //    this.getUser(data.user.id);
          console.log("HH" + data.user.id);
          this.getUserAuth(data.user.id);
        },
        error => {
          console.log(error);
        }
      )
  }

  getCourses(id){
    this.professorService.getAllCoursesByProfId(id)
      .subscribe(
        data => {
          this.courses = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    
  };

  getExamTakings(id){
    this.professorService.getAllExamTakingsByProfId(id)
      .subscribe(
        data => {
          this.examtakings = data;
          console.log(data);
        },
        error => {
          console.log(error)
        }
      )
  }

  getUserAuth(id){
    
  }

onTabClick(index){
  this.tabIndex = index;
}

removeCourse(course : Course){
  this.courses = this.courses.filter(c => c!== course);
}

addCourse(courseId : number){
  this.courseService.get(courseId).subscribe( data=>{
    this.courses.push(data);
  })
}
 
}

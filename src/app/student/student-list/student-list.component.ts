import { CourseAttendance } from './../../model/course-attendance.model';
import { StudentService } from './../../services/student.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/student.model';
import { Router } from '@angular/router';
import { ExamTaking } from 'src/app/model/exam-taking.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  @Input() public students : Student[];
  @Output() public studentSelected = new EventEmitter<Student>();

  // currentStudent = null;
  // currentUser = null;
  // currentIndex = -1;
  // students : Observable<Student[]>;
  // attendances : Observable<CourseAttendance[]>;
  // examtakings : Observable<ExamTaking[]>;

 // firstname = '';

  constructor(private studentService: StudentService,
              private router: Router,
              private userService: UserService){ }

  ngOnInit(): void {
    console.log("studenti su " + this.students)
  //  this.reloadData();
  }

  selectStudent(student : Student){
    this.studentSelected.emit(student);
  }

  // reloadData(){
  //   this.studentService.getAll()
  //     .subscribe(
  //       data => {
  //         this.students = data;
  //         console.log(data);
  //       },
  //       error =>{
  //         console.log(error);
  //       }
  //     );
  // }

  // refreshList(): void {
  //   this.reloadData();
  //   this.currentStudent = null;
  //   this.currentIndex = -1;
  // }

  // setActiveStudent(student, index): void {  
  //   this.currentStudent = student;
  //   this.currentIndex = index;
  //   this.getUser(this.currentStudent.id);
  // //  this.getAttendances(this.currentStudent.id);
  // //  this.getExamtakings(this.currentStudent.id);
   
  // }

  // getUser(id){
  //   this.userService.getByStudentId(id)
  //     .subscribe(
  //       data => {
  //         this.currentUser = data;
  //         console.log(data);
  //       },
  //       error =>{
  //         console.log(error);
  //       }
  //     );
    
  // }
  // //this is also in student details
  // getAttendances(id){
  
  // //the same
  // }
  // getExamtakings(id){

  // }

  // //delete je u student Details
  // deleteStudent(student_id : number){
  //   this.studentService.delete(student_id)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.reloadData();
  //       },
  //       error => console.log(error)
  //     );
  // }

}

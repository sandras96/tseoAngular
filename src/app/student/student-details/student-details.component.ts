import { Observable } from 'rxjs';
import { StudentService } from './../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { UserService } from 'src/app/services/user.service';
import { DocumentService } from 'src/app/services/document.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input() student : Student;
  student_id : number;
  
  currentStudent = null;
  currentUser : User = null;
  documents : Observable<Document[]>

  message = "";

  constructor(private route: ActivatedRoute,
              private router : Router,
              private studentService : StudentService,
              private userService : UserService,
              private documentService: DocumentService) { }

  ngOnInit(): void {
    this.student = new Student();
    this.message = '';
    this.getStudent(this.route.snapshot.paramMap.get('id'));
    
 //   this.getDocuments(this.route.snapshot.paramMap.get('id'));
    
  }

  getStudent(id) : void {
    this.studentService.get(id)
      .subscribe(
        data => {
          this.currentStudent = data;
          this.getUser(data.id);
          console.log(data.id);
        },
        error =>{
          console.log(error);
        }
      )
  }

  getUser(id){
    this.userService.getByStudentId(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error =>{
          console.log(error);
        }
      );
    
  }

  getDocuments(id){
    this.documentService.getDocumentsByStudentId(id)
      .subscribe(
        data => {
          this.documents = data;
          console.log(data);
        }, 
        error => {
          console.log(error)
        }
      )
  }
  updateStudent(): void {
    this.studentService.update(this.currentStudent.id, this.currentStudent)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'This Student was updated successfully!';
          
        },
        error => {
          console.log(error);
        });
  }
  deleteStudent(): void {
    this.studentService.delete(this.currentStudent.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/students']);
        },
        error => {
          console.log(error);
        });
  }
  list(){
    this.router.navigate(['students']); }
}

import { Component, OnInit } from '@angular/core';
import { Authority } from 'src/app/model/authority.model';
import { Professor } from 'src/app/model/professor.model';
import { Student } from 'src/app/model/student.model';
import { User } from 'src/app/model/user.model';
import { ProfessorService } from 'src/app/services/professor.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users : User[];
  user : User;
  student : Student;
  professor : Professor;
  authorities : Authority[];

 

  constructor(private userService: UserService, 
              private studentService : StudentService,
              private professorService : ProfessorService) { }

  ngOnInit(): void {
    this.getUsers();
    
  }

  getUsers(){
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log("Users ", data)
        },
        error => {
          console.log(error)
        }
      )
  }

  
  selected(user : any){
    
    this.findUser(user);
    this.findRole(user);
   
    this.user = user;

    console.log("USER JE ", user)
  }

  findUser(u) : any {
    if(u.authorities.some(e=> e.name ==="STUDENT")){
        this.studentService.getByUserId(u.id).subscribe(data => {
          this.student = data;
          console.log("student student je ", data);
        });
    }
    if(u.authorities.some(e=> e.name ==="PROFESSOR")){
        this.professorService.getByUserId(u.id).subscribe(data => {
          this.professor = data;
          console.log("Proff proff je ", data);
        });
    } 
  }

  findRole(u) : string {
    if(u.authorities.some(e=> e.name=="PROFESSOR")){
      return "professor"        
    }
    else
    if(u.authorities.some(e=> e.name =="STUDENT")){
      return "student"
    }
    else{
      return "admin"
    }
  }

}

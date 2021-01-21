import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user.model';
import { ProfessorService } from 'src/app/services/professor.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users : User[];
  @Output() userSelected  = new EventEmitter<User>();
  
  HighlightRow : any;  
  ClickedRow:any; 
  
  constructor() {
    this.ClickedRow = function(index){  
      this.HighlightRow = index;  
  }  
   }

  ngOnInit(): void {
  }

  selectUser(user : User){
    this.userSelected.emit(user);
  }
  
  findRole(u) : string {
     if(u.authorities.find(e=> e.name =="PROFESSOR")){
      return "professor"      
    } else
    if(u.authorities.find(e=> e.name =="STUDENT")){
      return "student"
    }else{
      return "admin"
    }
  }

  
    
  }
  
  


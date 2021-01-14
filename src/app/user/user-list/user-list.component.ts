import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users : User[];

  @Output() userSelected  = new EventEmitter<User>();
  constructor() { }

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

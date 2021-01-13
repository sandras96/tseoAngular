import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user : User;

  constructor() { }

  ngOnInit(): void {
   
  }

  findRole() : string {
    if(this.user.authorities.find(e=> e.name =="ADMIN")){
      return "admin";
    }
     if(this.user.authorities.find(e=> e.name =="PROFESSOR")){
      return "professor"      
    } 
    if(this.user.authorities.find(e=> e.name =="STUDENT")){
      return "student"
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Authority } from 'src/app/model/authority.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users : User[];
  user : User;
  authorities : Authority[];
 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    
  }

  getUsers(){
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log("Users ", data)
         //AUTHORITIES
        },
        error => {
          console.log(error)
        }
      )
  }

  
  selected(user : any){
    this.user = user;
    console.log("USER JE ", user)
  }

  
}

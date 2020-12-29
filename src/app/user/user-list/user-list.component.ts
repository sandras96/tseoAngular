import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  currentUser = null;
  currentIndex = -1;
  users : Observable<User[]>;

  constructor(private userService: UserService,
              private router : Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(){
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.log(error)
        }
      )
  };

  //napravi dugmence za refresh
  refreshList(): void {
    this.reloadData();
    this.currentUser = null;
    this.currentIndex = -1;
  }

setActiveUser(user, index) : void {
  this.currentUser = user;
  this.currentIndex = index;
}

}

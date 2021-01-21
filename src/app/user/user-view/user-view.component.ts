import { EnumType } from 'typescript';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from 'src/app/services/professor.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  createProfessorForm: FormGroup;
  user : User;

  changeForm: FormGroup;


  constructor(private userService : UserService,
              private route : ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getUser(this.route.snapshot.paramMap.get('id'));
  }
  
  getUser(id){
    this.userService.get(id)
      .subscribe(data => {
        this.user = data;
        console.log(data)
      },
      error =>{
        console.log(error)
      })
  }

  changePassword(){

  }

  deleteUser(){

  }

  updateUser(user){
    this.userService.update(user.id, user)
      .subscribe(data=>{
        console.log(data)
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  addForm: FormGroup;
  user : User = new User();
  tabIndex = 0;
  constructor( private userService : UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id : [],
      username : [''],
      password : ['']
    
     
    })
  }
  onTabClick(index){
    this.tabIndex = index;
    console.log(index)
  }

  createUser(){
    console.log("ADD form user je ", this.addForm.value)
    this.userService.create(this.addForm.value).subscribe(data=>{
      console.log(data)
    })
  }
}

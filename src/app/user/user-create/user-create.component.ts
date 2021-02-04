import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user : User = new User();
  tabIndex = 0;
  authorities = new FormArray([])
  addForm : FormGroup;
  submitted = false;
 
  constructor(private userService : UserService,
              private router : Router,
              private toastr : ToastrService) { }

  ngOnInit(): void {
 
    this.addForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required),
      authorities : new FormArray([
        new FormGroup({
             id: new FormControl(1),
             name: new FormControl('ADMIN'),
           })
      ])
  });   
}
get f() { return this.addForm.controls; }

onSubmit(){
  this.submitted = true;

 if (this.addForm.invalid) {
     return false;
 }
    this.createUser()
}

  createUser(){
    console.log("ADD form user je ", this.addForm.value)
     this.userService.create(this.addForm.value)
      .subscribe(data=>{
        this.toastr.success('User '+data.username+ ' was successfully created!', 'Success!')
         this.router.navigate(['/users/',data.id])
       console.log(data)
     }, error=>{
        this.toastr.error("Error, username already taken!", "Error!");
       console.log(error)
     })
  }

  refresh(){
    this.addForm.reset();
  }
  
  onTabClick(index){
    this.tabIndex = index;
  }

  
}
